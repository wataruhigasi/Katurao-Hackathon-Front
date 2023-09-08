"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/index.js";
import Canvas from "../../components/Rakugaki/index.js";

const Page = () => {
  // const [screenWidth, setScreenWidth] = useState(null);
  // const [screenHeight, setScreenHeight] = useState(null);

  // useEffect(() => {
  //   setScreenWidth(window.screen.width);
  //   setScreenHeight(window.screen.height);
  // }, []);
  useEffect(() => {
    // const handleScroll = () => {
    //   if (
    //     window.innerHeight + window.scrollY >=
    //     document.body.scrollHeight - 200
    //   ) {
    //     const content = document.createElement("div");
    //     content.style.minHeight = "200px";
    //     document.body.appendChild(content);
    //   }
    // };
    const handleScroll = () => {
      if (
        window.innerWidth + window.scrollX >=
        document.body.scrollWidth - 200
      ) {
        const content = document.createElement("div");
        content.style.minWidth = "200px";
        document.body.appendChild(content);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <Header />
      <div style={{ minWidth: "200px" }}></div>
    </div>
  );
};

export default Page;
