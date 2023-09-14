"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Header from "../../components/Header";
import ModeButton from "../../components/ModeButton";
import { useRakugakiCanvas } from "../../components/RakugakiCanvas";
import DragDropBox from "../../components/Dragdrop/DragDrop";

const Page: React.FC = () => {
  useEffect(() => {
    window.scrollTo(10 / 2, 10 / 2);
  }, []);

  const [mode, setMode] = useState<"select" | "edit" | "drag">("select");
  const modeButtonOnClick = (a: "select" | "edit" | "drag") => {
    return () => {
      setMode(a);
    };
  };

  const { RakugakiCanvas } = useRakugakiCanvas({
    canvasId: "keijiban-canvas",
    options: {
      height: 1000,
      width: 1000,
      isDrawingMode: true,
    },
    deps: [],
  });

  return (
    <>
      <Header />
      <ModeButton mode={mode} onClick={modeButtonOnClick} />
      <div className={styles.keijibanRakugakiCanvas}>
        <RakugakiCanvas />
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
