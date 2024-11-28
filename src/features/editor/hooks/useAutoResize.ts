import {fabric} from 'fabric'; // Importing the entire 'fabric' library for working with the canvas
import { useCallback, useEffect } from 'react'; // Importing React hooks: useCallback and useEffect

// Defining the types for the props passed into the hook
type UseAutoResizeProps = {
    canvasWrapper: HTMLDivElement | null; // The HTML element wrapping the canvas (could be null)
    canvas: fabric.Canvas | null; // The Fabric.js canvas instance (could be null)
};

// Main custom hook: useAutoResize
const useAutoResize = ({ canvasWrapper, canvas }: UseAutoResizeProps): void => {
    // autoZoom function handles the resizing of the canvas and workspace scaling
    const autoZoom = useCallback(() => {
        // If either the canvasWrapper or canvas are null, exit the function
        if (!canvasWrapper || !canvas) return;

        // Destructuring the width and height from the canvasWrapper's offset (visible size of the element)
        const { offsetWidth, offsetHeight } = canvasWrapper;

        // Setting the canvas' height and width to match the size of the canvasWrapper
        canvas.setHeight(offsetHeight);
        canvas.setWidth(offsetWidth);

        // Getting the center point of the canvas (used for zooming)
        const center = canvas.getCenter();
        const zoomRatio = 0.8; // Predefined zoom ratio to scale the workspace down

        // Finding the workspace object inside the canvas using its name 'defaultCanvasWorkspace'
        const workspace = canvas.getObjects().find((obj) => obj.name === "defaultCanvasWorkspace");
        // If no workspace is found, return early
        if (!workspace) return;

        // Calculate the scale needed to fit the workspace within the canvas dimensions
        // @ts-expect-error: findScaleToFit is not in the TypeScript definitions
        const scale = fabric.util.findScaleToFit(workspace, {
            width: offsetWidth, // Width of the canvas wrapper
            height: offsetHeight, // Height of the canvas wrapper
        });

        // Final zoom is the calculated scale multiplied by the zoom ratio (80% of the full scale)
        const zoom = zoomRatio * scale;

        // Resetting the viewport transformation of the canvas to the identity matrix (no transformations)
        canvas.setViewportTransform(fabric.iMatrix.concat());

        // Zoom to a specific point on the canvas (the center) with the calculated zoom level
        canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);

        // If no workspace object was found, stop the function here
        if (!workspace) return;

        // Get the center point of the workspace object inside the canvas
        const workspaceCenter = workspace.getCenterPoint();

        // Get the current viewport transformation of the canvas (transformation matrix)
        const viewportTransform = canvas.viewportTransform;

        // Check if canvas dimensions or viewport transformation are missing, and return if so
        // === undefined is used for safety in case values are 0 (which are valid but falsy)
        if (canvas.width === undefined || canvas.height === undefined || !viewportTransform) return;

        // Update the viewport's x-translation to center the workspace horizontally
        // The calculation adjusts the canvas to ensure that the workspace is centered based on its width and the current zoom level
        viewportTransform[4] = canvas.width / 2 - workspaceCenter.x * viewportTransform[0];

        // Update the viewport's y-translation to center the workspace vertically
        viewportTransform[5] = canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

        // Apply the new viewport transformation with the updated translation values
        canvas.setViewportTransform(viewportTransform);

        // Clone the workspace object (fabric.Rect) and use the clone as the clipping path for the canvas
        // This ensures that only the area within the workspace is visible on the canvas
        workspace.clone((clonedWorkspace: fabric.Rect) => {
            // Set the clip path of the canvas to the cloned workspace
            canvas.clipPath = clonedWorkspace;

            // Request a full render of the canvas with the updated clip path
            canvas.requestRenderAll();
        });

    }, [canvasWrapper, canvas]); // Dependency array for useCallback ensures that autoZoom only changes if these values change

    // useEffect hook that sets up a ResizeObserver to watch for changes in the canvasWrapper's size
    useEffect(() => {
        let resizeObserver: ResizeObserver | null = null; // Declare a ResizeObserver variable

        // If both the canvasWrapper and canvas exist, set up the observer
        if (canvasWrapper && canvas) {
            // Initialize the ResizeObserver, which will watch for resizing of the canvasWrapper element
            resizeObserver = new ResizeObserver(() => {
                // Log to the console when a resize is detected
                console.log('Resizing... ');

                // Call autoZoom whenever the size changes
                autoZoom();
            });

            // Start observing the canvasWrapper for any size changes
            resizeObserver.observe(canvasWrapper);
        }

        // Cleanup function that disconnects the observer when the component is unmounted or dependencies change
        return () => {
            // If the observer is still active, disconnect it to stop observing
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };

    }, [canvasWrapper, canvas, autoZoom]); // Dependency array for useEffect ensures it only runs when these values change
}

export { useAutoResize }; // Export the custom hook for use in other components