"use client";
import React, { useEffect, useState } from "react";
import Comment from "../../../../components/Comment/index.js";

const ThreadsPage = () => {
  const [height, setheight] = useState(200);
  const [width, setwidth] = useState(200);
  const title = {
    fontSize: "24px",
    color: "black",
  };
  const comments = [
    {
      name: "あゆむ",
      date: "2017/11/29 20:30",
      content: "おっきくなーれ",
    },
    {
      name: "あゆむ",
      date: "2020/05/29 20:30",
      content: "おっきくなーれ",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 200
      ) {
        setheight((height) => height + 50);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="bg-gray-200" style={{ minHeight: height + "vh" }}>
        <h2 style={title}>スレッドタイトル</h2>
        <div style={{ height: "20px" }}></div>
        <div style={{ borderTop: "10px dashed #8c8b8b" }}>
          <div style={{ height: "20px" }}></div>
          {comments.map((comment, index) => (
            <Comment key={index} index={index} {...comment} />
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-200"></div>
    </div>
  );
};

export default ThreadsPage;
