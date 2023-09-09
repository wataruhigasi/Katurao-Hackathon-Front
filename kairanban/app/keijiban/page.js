"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/index.js";
import Canvas from "../../components/Rakugaki/index.js";

const Page = () => {
  const [width, setwidth] = useState(50);
  const [height, setheight] = useState(100)
  useEffect(() => {

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 200
      ) {
        setheight((height) => height + 50)
      }
    };


    const yoko = () => {
      if (
        window.innerWidth + window.scrollX >=
        document.body.scrollWidth - 200
      ) {
        setwidth((width) => width + 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", yoko);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", yoko);
    };
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen" >
      <Header />
      <div style={{ minHeight: height + "vh", minWidth: width + "vw" }}></div>
    </div>
  );
};

export default Page;
