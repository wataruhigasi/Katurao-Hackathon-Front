import React, { useEffect } from "react";
import styles from "./index.module.css";
import * as fabric from "fabric";

const RakugakiCanvas: React.FC = () => {
  useEffect(() => {
    const canvas = new fabric.Canvas("c", {
      height: 500,
      width: 500,
      backgroundColor: "#ffffff",
      isDrawingMode: true,
    });
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);

    canvas.on("mouse:up", () => {
      console.log("hello");
    });

    canvas.on("path:created", (e) => {
      console.log(e);
      console.log(e.path);
      console.log(e.path.toSVG());
    });

    canvas.renderAll();
  }, []);

  return (
    <div className={styles.canvasContainer}>
      <canvas id="c" />
    </div>
  );
};

export default RakugakiCanvas;
