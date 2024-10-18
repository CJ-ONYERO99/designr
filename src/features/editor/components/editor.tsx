"use client"; // This directive tells Next.js that this component should be rendered on the client side.

import React, { useEffect, useRef } from 'react'; // Importing React and specific hooks (useEffect and useRef)
import { useEditor } from '../hooks/useEditor'; // Importing the custom useEditor hook
import * as fabric from 'fabric'; // Importing the Fabric.js library for working with the canvas

// Editor component definition
const Editor = () => {
  // Destructuring init function from useEditor hook
  const { init } = useEditor();

  // Creating a reference for the canvas wrapper (HTML div element)
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  // Creating a reference for the canvas element itself (HTML canvas element)
  const canvasRef = useRef(null);

  // useEffect hook that runs after the component renders
  useEffect(() => {
    // Create a new Fabric.js canvas instance when the component is mounted
    const canvas = new fabric.Canvas(canvasRef.current!, {
      controlsAboveOverlay: true, // Ensures that object controls (e.g., resize handles) appear above the overlay
      preserveObjectStacking: true, // Allows objects to stack properly on the canvas without losing order
    });

    // Initialize the canvas and canvas wrapper by passing them to the init function
    init({
      initialCanvasWrapper: canvasWrapperRef.current!, // The canvas wrapper HTML div
      initialCanvas: canvas, // The Fabric.js canvas instance
    });
    
    // Cleanup function that disposes of the canvas when the component is unmounted
    return () => {
      canvas.dispose(); // Disposes of the Fabric.js canvas instance to free up memory
    };
  }, [init]); // The effect depends on the init function, so it only runs when init changes

  // JSX for rendering the Editor component
  return (
    <div className="h-full flex flex-col">
      {/* Flex container that takes up the full height */}
      <div className="h-full flex-1 bg-neutral-800" ref={canvasWrapperRef}>
        {/* 
          Canvas resizing is tricky, so a div (canvasWrapperRef) is used to wrap the canvas.
          A ResizeObserver (from the useAutoResize hook) watches this wrapper for size changes,
          and the canvas dimensions are updated accordingly.
        */}
        <canvas ref={canvasRef} /> {/* Actual canvas element that will be used by Fabric.js */}
      </div>
    </div>
  );
};

export default Editor; // Exporting the Editor component for use in other parts of the application