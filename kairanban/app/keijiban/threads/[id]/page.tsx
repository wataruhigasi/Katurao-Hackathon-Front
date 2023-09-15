"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "./threads.module.css";
import ModeButton from "../../../../components/ModeButton";
import ReturnIcon from "../../../../public/ReturnIcon.svg";
import * as fabric from "fabric";
import { useParams } from "next/navigation";

const CANVAS_ID = "threads-canvas";

type RakugakisResponse = {
  id: number;
  created_at: string;
  body: string;
  position: {
    x: number;
    y: number;
  };
}[];

const getRakugakis = async (threadId: string): Promise<RakugakisResponse> => {
  const resp = await fetch(
    `http://localhost:8080/thread/${threadId}/rakugakis`
  );
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
  },
  threadId: string
): void => {
  fetch(`http://localhost:8080/thread/${threadId}/rakugaki`, {
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

const ThreadsPage: React.FC = () => {
  const params = useParams();

  useEffect(() => {
    window.scrollTo(1000 / 2, 1000 / 2);
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

    newCanvas.on("mouse:up", (e: any) => {
      if (e.currentTarget.aCoords) {
        postPath(
          e.currentTarget,
          e.currentTarget.aCoords.tl,
          params.id as string
        );
      }
    });

    getRakugakis(params.id as string).then((rakugakis) => {
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
      <ModeButton mode={mode} onClick={modeButtonOnClick} />
      <div className={styles.background}>
        <canvas
          id={CANVAS_ID}
          className={mode === "edit" ? styles.zIndexPlus : styles.zIndexZero}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button>
          <Link href="/keijiban/">
            <ReturnIcon className={styles.icon} />
          </Link>
        </button>
      </div>
    </>
  );
};

export default ThreadsPage;
