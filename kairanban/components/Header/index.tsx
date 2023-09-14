"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Popup from "reactjs-popup";
import RakugakiCanvas from "../RakugakiCanvas";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { RakugakiCanvas } = useRakugakiCanvas({
  //   canvasId: "create-canvas",
  //   options: {
  //     width: 480 - 16 * 2,
  //     height: 480 * Math.sqrt(2) - 16 * 2,
  //     isDrawingMode: true,
  //   },
  //   deps: [isOpen],
  // });

  return (
    <header className={styles.headerStyle}>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>
          <Link href="/keijiban/threads/new">スレッド作成</Link>
        </button>

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
              <div className={styles.popupContent}>
                <RakugakiCanvas
                  canvasId="aaa"
                  className={styles.createArticleCanvas}
                  options={{
                    height: 500,
                    width: 400,
                    isDrawingMode: true,
                  }}
                />
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
