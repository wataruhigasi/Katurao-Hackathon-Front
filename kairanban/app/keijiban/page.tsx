"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Header from "../../components/Header";
import ModeButton from "../../components/ModeButton";
import DragDropBox from "../../components/Dragdrop/DragDrop";
import * as fabric from "fabric";

const CANVAS_ID = "keijiban-canvas";

type RakugakisResponse = {
  id: number;
  created_at: string;
  body: string;
  position: {
    x: number;
    y: number;
  };
}[];

const getRakugakis = async (): Promise<RakugakisResponse> => {
  const resp = await fetch("http://localhost:8080/keijiban/rakugakis");
  if (!resp.ok) {
    console.error("らくがきの取得に失敗しました: ", resp);
    return;
  }
  return await resp.json();
};

const postPath = (
  path: fabric.Path,
  position: {
    x: number;
    y: number;
  }
): void => {
  fetch("http://localhost:8080/keijiban/rakugaki", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // toSVG()の引数がなくてTSに怒られるけど、公式がそう書いてる
      // @ts-ignore
      body: path.toSVG(),
      position,
    }),
  })
    .then((resp) => {
      if (!resp.ok) {
        console.error("らくがきの保存に失敗しました: ", resp);
      }
    })
    .catch((err) => {
      console.error("らくがきの送信に失敗しました: ", err);
    });
};

const Page: React.FC = () => {
  // 画面中央にスクロール
  useEffect(() => {
    window.scrollTo(10000 / 2, 10000 / 2);
  }, []);

  const [mode, setMode] = useState<"select" | "edit">("select");
  const modeButtonOnClick = (a: "select" | "edit") => {
    return () => {
      setMode(a);
    };
  };

  // fabric.Canvasを再レンダリングのたびに生成するとエラーになるので、unmount処理のために保持する
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const isEdit = mode === "edit";

  useEffect(() => {
    const newCanvas = new fabric.Canvas(CANVAS_ID, {
      height: 10000,
      width: 10000,
      isDrawingMode: isEdit,
    });
    newCanvas.freeDrawingBrush = new fabric.PencilBrush(newCanvas);

    newCanvas.on("mouse:up", (e: any) => {
      if (e.currentTarget.aCoords) {
        postPath(e.currentTarget, e.currentTarget.aCoords.tl);
      }
    });

    getRakugakis().then((rakugakis) => {
      rakugakis.forEach((rakugaki) => {
        fabric.loadSVGFromString(rakugaki.body).then((svg) => {
          if (svg.objects[0]) {
            newCanvas.add(svg.objects[0]);
          }
        });
      });

      canvasRef.current = newCanvas;
    });

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
          className={mode === "edit" ? styles.zIndexPlus : styles.zIndexZero}
        />
      </div>
      <DragDropBox />
    </>
  );
};

export default Page;
