"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "./threads.module.css";
import ModeButton from "../../../../components/ModeButton";
import ReturnIcon from "../../../../public/ReturnIcon.svg";
import * as fabric from "fabric";

const CANVAS_ID = "threads-canvas";

const ThreadsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(10 / 2, 10 / 2);
  }, []);

  const [mode, setMode] = useState<"select" | "edit" | "drag">("select");
  const modeButtonOnClick = (a: "select" | "edit" | "drag") => {
    return () => {
      setMode(a);
    };
  };

  const isEdit = mode === "edit";

  const canvasRef = useRef<fabric.Canvas | null>(null);
  useEffect(() => {
    const newCanvas = new fabric.Canvas(CANVAS_ID, {
      height: 1000,
      width: 1000,
      isDrawingMode: isEdit,
    });
    newCanvas.freeDrawingBrush = new fabric.PencilBrush(newCanvas);

    canvasRef.current = newCanvas;
    return () => {
      if (canvasRef.current) {
        canvasRef.current.dispose();
      }
    };
  }, [isEdit]);

  return (
    <>
      <ModeButton mode={mode} onClick={modeButtonOnClick} />
      <div className={styles.keijibanBackground}>
        <canvas
          id={CANVAS_ID}
          className={mode === "edit" ? styles.zIndexPlus : styles.zIndexMinus}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.icon}>
          <Link href="/keijiban/">
            <ReturnIcon />
          </Link>
        </button>
      </div>
    </>
  );
};

export default ThreadsPage;
