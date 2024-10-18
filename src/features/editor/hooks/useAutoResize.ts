import * as fabric from 'fabric';
import { useCallback, useEffect } from 'react';

type UseAutoResizeProps = {
    canvasWrapper: HTMLDivElement | null;
    canvas: fabric.Canvas | null;
};

const useAutoResize = ({ canvasWrapper, canvas }: UseAutoResizeProps): void => {
    // autoZoom function takes care of resizing the canvas and the workspace
    const autoZoom = useCallback(() => {
        if (!canvasWrapper || !canvas) return;
        const { offsetWidth, offsetHeight } = canvasWrapper;
        canvas.setHeight(offsetHeight);
        canvas.setWidth(offsetWidth);

        const center = canvas.getCenter();
        const zoomRatio = 0.8
        const workspace = canvas.getObjects().find((obj) => obj.name === "defaultCanvasWorkspace");

        // @ts-expect-error
        const scale = fabric.util.findScaleToFit(workspace, {
            width: offsetWidth,
            height: offsetHeight,
        });

        const zoom = zoomRatio * scale;

        canvas.setViewportTransform(fabric.iMatrix.concat());
        canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);

        if(!workspace) return;

        const workspaceCenter = workspace.getCenterPoint();
        const viewportTransform = canvas.viewportTransform;

        // Note: i am using === undefined instead of !viewportTransform because canvasWidth and canvasHeight can be 0

        if(canvas.width === undefined || canvas.height === undefined || !viewportTransform)
            
        return;

        viewportTransform[4] = canvas.width / 2 - workspaceCenter.x * viewportTransform[0];

        viewportTransform[5] = canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

        canvas.setViewportTransform(viewportTransform);

        workspace.clone((clonedWorkspace: fabric.Rect) => {
            canvas.clipPath = clonedWorkspace;
            canvas.requestRenderAll();
        });

    }, [canvasWrapper, canvas]);

    useEffect(() => {
        let resizeObserver: ResizeObserver | null = null;

        if (canvasWrapper && canvas) {
            resizeObserver = new ResizeObserver(() => {
            console.log('Resizing... ');
            autoZoom();
            });

            //start observing the canvasWrapper
            resizeObserver.observe(canvasWrapper);
        }
      
    }, [canvas, canvasWrapper, autoZoom]);
}
export { useAutoResize };