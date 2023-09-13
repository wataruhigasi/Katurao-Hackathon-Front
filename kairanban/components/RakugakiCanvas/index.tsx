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

    // マウスのドラッグで線を描画
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.on("mouse:down", (event) => {
      isDrawing = true;
      const pointer = canvas.getPointer(event.e);
      lastX = pointer.x;
      lastY = pointer.y;
    });

    canvas.on("mouse:move", (event) => {
      if (!isDrawing) return;
      const pointer = canvas.getPointer(event.e);
      const currentX = pointer.x;
      const currentY = pointer.y;

      // 線を描画
      const line = new fabric.Line([lastX, lastY, currentX, currentY], {
        fill: "black",
        stroke: "black",
        strokeWidth: 2,
      });

      canvas.add(line);

      lastX = currentX;
      lastY = currentY;
    });

    canvas.on("mouse:up", () => {
      isDrawing = false;
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
