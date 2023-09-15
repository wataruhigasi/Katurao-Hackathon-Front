"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Popup from "reactjs-popup";
import * as fabric from "fabric";

const postArticle = (
  svg: string,
  position: {
    x: number;
    y: number;
  }
): void => {
  fetch("http://localhost:8080/article", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body: svg,
      position,
    }),
  })
    .then((resp) => {
      if (!resp.ok) {
        console.log("記事の作成に失敗しました: ", resp);
      }
    })
    .catch((err) => {
      console.error("記事の作成に失敗しました: ", err);
    });
};
import axios from "axios";

const CANVAS_ID = "create-canvas";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 完了ボタンを押すときにcanvasを保持しておきたい
  const canvasRef = React.useRef<fabric.Canvas | null>(null);
  const [canvasSize, setCanvasSize] = useState({
    width: 480 - 16 * 2,
    height: 480 * Math.sqrt(2) - 16 * 2,
    isDrawingMode: true,
  });

  useEffect(() => {
    const newCanvas = new fabric.Canvas(CANVAS_ID, canvasSize);
    newCanvas.freeDrawingBrush = new fabric.PencilBrush(newCanvas);

    canvasRef.current = newCanvas;

    return () => {
      if (canvasRef.current) {
        canvasRef.current.dispose();
      }
    };
  }, [isOpen]);

  const PostArticle = async () => {
    const EndPoint = "http://localhost:8000/api/articles";
    const PostRequestData = {
      body: "SVG",
      position: {
        x: 100,
        y: 200,
      },
    };
    try {
      const response = await axios.post(EndPoint, PostRequestData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className={styles.headerStyle}>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>
          <Link href="/keijiban/threads/new">スレッド作成</Link>
        </button>

        <Popup
          trigger={<button className={styles.button}>スレッド作成</button>}
          modal
          overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
          closeOnDocumentClick={false}
          onOpen={() => {
            setIsOpen(true);
          }}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          {/* This is a reactjs-popup style. See also https://react-popup.elazizi.com/react-modal */}
          {/* @ts-ignore */}
          {(close) => (
            <>
              <div className={styles.popupContent}>
                <canvas id={CANVAS_ID} className={styles.createArticleCanvas} />
              </div>
              <button
                onClick={() => {
                  close();
                  if (canvasRef.current) {
                    // toSVG()の引数は無いとTSに怒られるが、なぜか動くっぽい(公式が引数なしで書いてる)
                    // @ts-ignore
                    const svg = canvasRef.current.toSVG();
                    postArticle(svg, {
                      x: canvasRef.current.getCenterPoint().x,
                      y: canvasRef.current.getCenterPoint().y,
                    });
                  }
                }}
              >
                完了
              </button>
              <div className={styles.close} onClick={close}>
                &times;
              </div>
            </>
          )}
        </Popup>

        <Popup
          trigger={<button className={styles.button}>記事作成</button>}
          modal
          overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
          closeOnDocumentClick={false}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
        >
          {/* This is a reactjs-popup style. See also https://react-popup.elazizi.com/react-modal */}
          {/* @ts-ignore */}
          {(close) => (
            <>
              <div className={styles.popupArticleContent}>
                <canvas id={CANVAS_ID} className={styles.createArticleCanvas} />
              </div>
              <button
                onClick={() => {
                  close();
                  if (canvasRef.current) {
                    // toSVG()の引数は無いとTSに怒られるが、なぜか動くっぽい(公式が引数なしで書いてる)
                    // @ts-ignore
                    const svg = canvasRef.current.toSVG();
                    postArticle(svg, {
                      x: canvasRef.current.getCenterPoint().x,
                      y: canvasRef.current.getCenterPoint().y,
                    });
                  }
                }}
              >
                完了
              </button>
              <div className={styles.close} onClick={close}>
                &times;
              </div>
            </>
          )}
        </Popup>
      </div>
    </header>
  );
};

export default Header;
