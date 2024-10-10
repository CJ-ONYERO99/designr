"use client";

import React, { useEffect, useRef } from 'react';
import { useEditor} from '../hooks/useEditor';
import * as fabric from 'fabric';

const Editor = () => {
  const { init } = useEditor()

  const canvasWrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current!, {
      //This will make sure that the controls of the object are above the overlay
        controlsAboveOverlay: true,
        preserveObjectStacking: true,
    })
    
    init({
      initialCanvasWrapper: canvasWrapperRef.current!,
      initialCanvas: canvas,
    });
    
    return () => {
      canvas.dispose()
    }
  }, [init])

  return (
    <div className="h-full flex flex-col">
      <div className="h-full flex-1 bg-neutral-800" ref={canvasWrapperRef}>
        {/* Canvas resizing is difficult hence i am using a div as a canvasWrapperRef and i will use a resize
        observer to see if canvasWrapperRef is resized and use the width and height from there to set width
        and height of canvas */}
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Editor;