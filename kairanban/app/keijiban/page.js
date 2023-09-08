"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/index.js";
import Canvas from "../../components/Rakugaki/index.js";

const Page = () => {
  const [width, setaa] = useState(50);
  useEffect(() => {

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 200
      ) {
        const content = document.createElement("div");
        content.style.minHeight = "200px";
        document.body.appendChild(content);
      }
    };


    const yoko = () => {
      if (
        window.innerWidth + window.scrollX >=
        document.body.scrollWidth - 200
      ) {
        const content = document.createElement("div");
        setaa((width) => width + 50);

        document.body.appendChild(content);
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
      <div style={{ minHeight: "100vh", minWidth: width + "vh" }}></div>
    </div>
  );
};

export default Page;
