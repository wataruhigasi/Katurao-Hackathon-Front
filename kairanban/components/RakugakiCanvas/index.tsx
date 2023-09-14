import React, { useEffect } from "react";
import styles from "./index.module.css";
import * as fabric from "fabric";

type RakugakiCanvasProps = {
  height: number;
  width: number;
};

const RakugakiCanvas: React.FC<RakugakiCanvasProps> = ({ height, width }) => {
  console.log("CanvasSize", height, width);
  useEffect(() => {
    const canvas = new fabric.Canvas("canvas-id", {
      height: height,
      width: width,
      isDrawingMode: true,
    });
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);

    canvas.on("mouse:up", () => {
      console.log("hello");
    });

    canvas.on("path:created", (e) => {
      console.log(e);
      console.log(e.path);
    });

    canvas.renderAll();
  }, []);

  return (
    <div className={styles.rakugakiCanvas}>
      <canvas id="canvas-id" />
    </div>
  );
};

export default RakugakiCanvas;
