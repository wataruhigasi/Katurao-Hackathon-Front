"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";

const Page: React.FC = () => {
  return (
    <div className={styles.canvasContainer}>
      {/* ui-canvasはボタンなど専用のキャンバス */}
      <canvas
        className={styles.uiCanvas}
        height={"10000px"}
        width={"10000px"}
      ></canvas>

      {/* keijiban-canvasは記事やスレッド専用のキャンバス */}
      <canvas
        className={styles.keijibanCanvas}
        height={"10000px"}
        width={"10000px"}
      ></canvas>

      {/* rakugaki-canvasはらくがき専用のキャンバス */}
      <canvas
        className={styles.rakugakiCanvas}
        height={"10000px"}
        width={"10000px"}
      ></canvas>
    </div>
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
