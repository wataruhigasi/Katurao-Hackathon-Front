"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import style from "./header.module.css";

const Header = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 60;
      const headerWidth = 1;

      if (window.scrollY >= headerHeight || window.scrollX >= headerWidth) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerStyle = {
    position: isHeaderFixed ? "fixed" : "static",
    top: 0,
    width: "100%",
    zIndex: 999,
    background: "white",
  };

  const buttonContainerStyle = {
    marginLeft: "auto",
    marginRight: "40px",
  };

  return (
    <header style={headerStyle} className="bg-white p-4 flex justify-end">
      <div style={buttonContainerStyle}>
        <button className="rounded-full text-green-500 border border-green-500 font-semibold rounded hover:bg-green-100 px-4 py-2 mr-2">
          <Link href="/keijiban/threads/new">スレッド作成</Link>
        </button>
        <button className="rounded-full text-green-500 border border-green-500 font-semibold rounded hover:bg-green-100 px-4 py-2">
          <Link href="/keijiban/articles/new">記事作成</Link>
        </button>
      </div>
    </header>
  );
};
export default Header;
