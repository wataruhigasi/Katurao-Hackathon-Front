import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";

type RakugakiCanvasProps = {
  canvasId: string;
  className?: string;
  options?: {};
};

const RakugakiCanvas: React.FC<RakugakiCanvasProps> = ({
  canvasId,
  className,
  options,
}) => {
  const canvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasId, options);
    newCanvas.isDrawingMode = true;
    newCanvas.freeDrawingBrush = new fabric.PencilBrush(newCanvas);
    canvasRef.current = newCanvas;

    return () => {
      console.log("unmount");
      if (canvasRef.current) {
        canvasRef.current.dispose();
      }
    };
  }, [canvasId, options]);

  return <canvas id={canvasId} className={className} />;
};

export default RakugakiCanvas;
