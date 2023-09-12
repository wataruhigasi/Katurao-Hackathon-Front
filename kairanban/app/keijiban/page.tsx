"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Header from "../../components/Header";
import RakugakiButton from "../../components/Button/RakugakiButton";
import ModeButton from "../../components/ModeButton";

const Page: React.FC = () => {
  useEffect(() => {
    window.scrollTo(10000 / 2, 10000 / 2);
  }, []);

  return (
    <>
      <Header />
      <ModeButton />
      <div className={styles.canvasContainer}>
        {/* rakugaki-canvasはらくがき専用のキャンバス */}
        <canvas
          className={styles.rakugakiCanvas}
          height={"10000px"}
          width={"10000px"}
        ></canvas>
      </div>
      {/* <RakugakiButton /> */}
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
