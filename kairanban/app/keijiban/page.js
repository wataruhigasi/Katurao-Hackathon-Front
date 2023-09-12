"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/index.js";
import Canvas from "../../components/Rakugaki/index.js";
import DragDropBox from "../../components/Dragdrop/DragDrop.js";
import RakugakiButton from "../../components/Button/RakugakiButton.js";

const Page = () => {
  const [width, setwidth] = useState(50);
  const [height, setheight] = useState(100);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 200
      ) {
        setheight((height) => height + 50);
      }
    };

    const yoko = () => {
      if (
        window.innerWidth + window.scrollX >=
        document.body.scrollWidth - 200
      ) {
        setwidth((width) => width + 50);
      }

      const headerHeight = 60;
      if (window.scrollY >= headerHeight) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", yoko);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", yoko);
    };
  }, []);

  // const toggleCanvas = () => {
  //   console.log("toggleCanvas");
  //   setIsCanvasVisible(!isCanvasVisible);
  // };

  const GetArticles = async () => {
    try {
      const Endpoint = "http://localhost:8080/articles";
      const response = await fetch(Endpoint);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  return (
    <div>
      <Header />
      <div
        className="bg-gray-200"
        style={{
          opacity: 0.3,
          minHeight: height + "vh",
          minWidth: width + "vw",
        }}
      >
        <button onClick={GetArticles}>Get Articles</button>
        <DragDropBox width={width} height={height} />
        <Canvas width={width} height={height} />
        {/* <RakugakiButton /> */}
      </div>
    </div>
  );
};

export default Page;
