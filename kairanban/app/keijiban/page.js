"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/index.js";
import Canvas from "../../components/Rakugaki/index.js";

const Page = () => {
  const [width, setwidth] = useState(50);
  const [height, setheight] = useState(100);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

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
      // スクロール位置がヘッダーの位置を超えたらヘッダーを固定
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

  const headerStyle = {
    position: isHeaderFixed ? "fixed" : "static",
    top: 0,
    width: "100%",
    zIndex: 999,
    background: "white",
  };

  return (
    <div>
      <Header />
      <div
        className="bg-gray-200"
        style={{ minHeight: height + "vh", minWidth: width + "vw" }}
      >
        <button onClick={GetArticles}>Get Articles</button>
        <Canvas width={width} height={height} />
        {/* <div style={{ minHeight: height + "vh", minWidth: width + "vw" }}></div> */}
      </div>
    </div>
  );
};

export default Page;
