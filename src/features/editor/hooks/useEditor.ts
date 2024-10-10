import { useCallback } from 'react';
import * as fabric from 'fabric';

const useEditor = () => {
  const init = useCallback(
    ({
      initialCanvasWrapper,
      initialCanvas,
    }: {
      initialCanvasWrapper: HTMLDivElement;
      initialCanvas: fabric.Canvas;
    }) => {
      console.log('initializing Editor... ');

      // set the canvas properties - Object properties
      fabric.Object.prototype.set({
        cornerColor: '#FFF',
        cornerStyle: 'circle',
        borderColor: '#8b3dff',
        borderScaleFactor: 2.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 0.8,
        cornerStrokeColor: '#8b3dff',
      });

      // create a rectangle to define the workspace of canvas
      const defaultCanvasWorkspace = new fabric.Rect({
        width: 1088,
        height: 1920,
        name: "defaultCanvasWorkspace",
        fill: 'white',
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: 'rgba(0,0,0,0.3)',
          blur: 10,
        }),

      })
      //set the height and width of the canvas-container div to the height and width of the canvas Wrapper
      initialCanvas.setHeight(initialCanvasWrapper.offsetHeight);
      initialCanvas.setWidth(initialCanvasWrapper.offsetWidth);

      // add the initial settings to the canvas
      initialCanvas.add(defaultCanvasWorkspace);
      initialCanvas.centerObject(defaultCanvasWorkspace);

      //elements outside the initial settings will not be visible
      initialCanvas.clipPath = defaultCanvasWorkspace;

      const rectangleObject = new fabric.Rect({
        width: 400,
        height: 400,
        fill: 'red',
      });

      initialCanvas.add(rectangleObject);
      initialCanvas.centerObject(rectangleObject);

    },
    []
  );

  return { init };
};

export { useEditor };
