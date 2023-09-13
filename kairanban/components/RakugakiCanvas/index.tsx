import React, {
  useRef,
  useState,
  useEffect,
  createElement,
  ReactSVGElement,
} from "react";
import styles from "./index.module.css";
import * as fabric from "fabric";
// import { Canvas } from "fabric/fabric-impl";

type RakugakiCanvasProps = {
  width: number;
  height: number;
};

const RakugakiCanvas: React.FC<RakugakiCanvasProps> = ({ width, height }) => {
  // キャンバスの初期化処理
  useEffect(() => {
    let canvas = new fabric.Canvas("canvas-id", {
      isDrawingMode: true,
      width: 10000,
      height: 10000,
      backgroundColor: "#80beaf",
    });
  }, []);

  return (
    <div className={styles.canvasContainer}>
      <canvas id="canvas-id" />
    </div>
  );
};

export default RakugakiCanvas;
