import React, { useEffect } from "react";
import * as fabric from "fabric";

type UseRakugakiCanvas = (props: {
  canvasId: string;
  className?: string;
  options?: {};
  deps?: React.DependencyList;
}) => {
  RakugakiCanvas: React.FC<RakugakiCanvasProps>;
  canvas: fabric.Canvas;
};

type RakugakiCanvasProps = {
  className?: string;
};

export const useRakugakiCanvas: UseRakugakiCanvas = ({ canvasId, options, deps }) => {
  let canvas = null;

  useEffect(() => {
    canvas = new fabric.Canvas(canvasId, options);
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
  }, deps);

  const RakugakiCanvas: React.FC<RakugakiCanvasProps> = ({ className }) => {
    return <canvas id={canvasId} className={className} />;
  };

  return {
    RakugakiCanvas,
    canvas,
  };
};

export default useRakugakiCanvas;
