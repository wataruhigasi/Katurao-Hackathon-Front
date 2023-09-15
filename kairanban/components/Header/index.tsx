"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Popup from "reactjs-popup";
import * as fabric from "fabric";

const CANVAS_ID = "create-canvas";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [canvasSize, setCanvasSize] = useState({
    width: 480 - 16 * 2,
    height: 480 * Math.sqrt(2) - 16 * 2,
    isDrawingMode: true,
  });

  useEffect(() => {
    const canvas = new fabric.Canvas(CANVAS_ID, canvasSize);
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
  }, [isOpen]);

  return (
    <header className={styles.headerStyle}>
      <div className={styles.buttonContainer}>
        <Popup
          trigger={<button className={styles.button}>スレッド作成</button>}
          modal
          overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
          closeOnDocumentClick={false}
          onOpen={() => {
            setCanvasSize({ width: 200, height: 200, isDrawingMode: true });
            setIsOpen(true);
          }}
          onClose={() => {
            setCanvasSize({
              width: 480 - 16 * 2,
              height: 480 * Math.sqrt(2) - 16 * 2,
              isDrawingMode: true,
            });
            setIsOpen(false);
          }}
        >
          {/* This is a reactjs-popup style. See also https://react-popup.elazizi.com/react-modal */}
          {/* @ts-ignore */}
          {(close) => (
            <>
              <div className={styles.popupThreadContent}>
                <canvas id={CANVAS_ID} className={styles.createArticleCanvas} />
              </div>
              <button onClick={close}>完了</button>
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
              <div className={styles.popupArticleContent}>
                <canvas id={CANVAS_ID} className={styles.createArticleCanvas} />
              </div>
              <button onClick={close}>完了</button>
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
