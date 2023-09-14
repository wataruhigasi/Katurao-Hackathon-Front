"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Header from "../../components/Header";
import ModeButton from "../../components/ModeButton";
import RakugakiCanvas from "../../components/RakugakiCanvas";

const Page: React.FC = () => {
  useEffect(() => {
    window.scrollTo(10000 / 2, 10000 / 2);
  }, []);

  const [mode, setMode] = useState<"select" | "edit">("select");
  const modeButtonOnClick = (a: "select" | "edit") => {
    return () => {
      setMode(a);
    };
  };

  return (
    <>
      <Header />
      <ModeButton mode={mode} onClick={modeButtonOnClick} />
      <RakugakiCanvas width={10000} height={10000} />
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
