"use client";
import React, { useEffect, useState } from "react";
import Comment from "../../../../components/Comment/index.js";

const threadsPage = () => {
  const [height, setheight] = useState(200);
  const title = {
    fontSize: "24px",
    color: "black",
  };
  const comments = [
    {
      name: "John Doe",
      time: "10:00 AM",
      content: "コメント1の内容",
    },
    {
      name: "Jane Smith",
      time: "11:30 AM",
      content: "コメント2の内容",
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
        <div style={{ borderTop: "10px dashed #8c8b8b" }}>
          {/* ここにコンテンツを配置 */}
          {comments.map((comment, index) => (
            <Comment key={index} index={index} {...comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default threadsPage;
