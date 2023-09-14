"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Header from "../../components/Header";
import ModeButton from "../../components/ModeButton";
import DragDropBox from "../../components/Dragdrop/DragDrop";
import * as fabric from "fabric";

const CANVAS_ID = "keijiban-canvas";

const Page: React.FC = () => {
  // 画面中央にスクロール
  useEffect(() => {
    window.scrollTo(1000 / 2, 1000 / 2);
  }, []);

  const [mode, setMode] = useState<"select" | "edit" | "drag">("select");
  const modeButtonOnClick = (a: "select" | "edit" | "drag") => {
    return () => {
      setMode(a);
    };
  };

  // fabric.Canvasを再レンダリングのたびに生成するとエラーになるので、unmount処理のために保持する
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const isEdit = mode === "edit";

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
      <Header />
      <ModeButton mode={mode} onClick={modeButtonOnClick} />
      <div className={styles.keijibanBackground}>
        <canvas
          id={CANVAS_ID}
          className={mode === "edit" ? styles.zIndexPlus : styles.zIndexMinus}
        />
      </div>
      <DragDropBox />
    </>
  );
};

export default Page;

// <DragDropBox width={1000} height={1000} />

// const GetArticles = async () => {
//   try {
//     const Endpoint = "http://localhost:8080/articles";
//     const response = await fetch(Endpoint);

//     if (!response.ok) {
//       throw new Error(`Network response was not ok: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("An error occurred while fetching data:", error);
//   }
// };
