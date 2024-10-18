import { useCallback, useState } from 'react'; // Importing React hooks: useCallback and useState
import * as fabric from 'fabric'; // Importing the 'fabric' library for canvas manipulation
import { useAutoResize } from './useAutoResize'; // Importing the custom hook for auto-resizing the canvas

// Main custom hook: useEditor
const useEditor = () => {
  // Declaring state for the canvas wrapper (the HTML element that contains the canvas)
  const [canvasWrapper, setCanvasWrapper] = useState<HTMLDivElement | null>(null);

  // Declaring state for the Fabric.js canvas instance (used to draw and manipulate objects)
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  // Calling the useAutoResize hook to handle automatic resizing of the canvas
  // This hook takes in the canvas wrapper and the canvas to adjust their size dynamically
  useAutoResize({
    canvasWrapper,
    canvas,
  });

  // The init function initializes the canvas and sets up the editor's default settings
  const init = useCallback(
    ({
      initialCanvasWrapper, // The canvas wrapper element
      initialCanvas, // The Fabric.js canvas instance
    }: {
      initialCanvasWrapper: HTMLDivElement; // Expecting the wrapper to be an HTMLDivElement
      initialCanvas: fabric.Canvas; // Expecting the canvas to be a Fabric.js canvas
    }) => {
      console.log('initializing Editor... '); // Log to indicate the initialization process

      // Set default properties for all objects (shapes, text, etc.) created on the canvas
      fabric.Object.prototype.set({
        cornerColor: '#FFF', // The color of control corners
        cornerStyle: 'circle', // Style of the corners (circle or square)
        borderColor: '#8b3dff', // The color of the object's border
        borderScaleFactor: 2.5, // Scaling factor for the border when resizing objects
        transparentCorners: false, // Corners are solid, not transparent
        borderOpacityWhenMoving: 0.8, // Opacity of the border when the object is being moved
        cornerStrokeColor: '#8b3dff', // Color of the corner stroke
      });

      // Create a rectangular object to serve as the default workspace for the canvas
      const defaultCanvasWorkspace = new fabric.Rect({
        width: 1088, // Width of the workspace
        height: 1920, // Height of the workspace
        name: "defaultCanvasWorkspace", // Giving the object a name to easily find it later
        fill: 'white', // Fill color of the workspace
        selectable: false, // Disables selection of the workspace object
        hasControls: false, // No resize or rotation controls for this object
        shadow: new fabric.Shadow({
          color: 'rgba(0,0,0,0.3)', // Color of the shadow
          blur: 10, // Blur effect for the shadow
        }),
      });

      // Set the height and width of the canvas based on the wrapper's dimensions
      initialCanvas.setHeight(initialCanvasWrapper.offsetHeight);
      initialCanvas.setWidth(initialCanvasWrapper.offsetWidth);

      // Add the default workspace to the canvas
      initialCanvas.add(defaultCanvasWorkspace);

      // Center the workspace object on the canvas
      initialCanvas.centerObject(defaultCanvasWorkspace);

      // Set the workspace as a clipping path, ensuring objects outside this area are hidden
      initialCanvas.clipPath = defaultCanvasWorkspace;

      // Store the canvas and canvas wrapper in the state for future access
      setCanvas(initialCanvas);
      setCanvasWrapper(initialCanvasWrapper);

      // Example: Create a red rectangle and add it to the canvas
      const rectangleObject = new fabric.Rect({
        width: 400, // Width of the rectangle
        height: 400, // Height of the rectangle
        fill: 'red', // Fill color (red)
      });

      // Add the rectangle object to the canvas
      initialCanvas.add(rectangleObject);

      // Center the rectangle object on the canvas
      initialCanvas.centerObject(rectangleObject);

    },
    [] // Empty dependency array ensures that init is only created once (memoized)
  );

  // Return the init function so it can be used elsewhere in the app
  return { init };
};

export { useEditor }; // Export the hook so it can be imported and used in other components