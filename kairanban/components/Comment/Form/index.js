import React, { useState } from "react";

const CommentForm = ({ onPost }) => {
  const [content, setContent] = useState("");

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // フォームを送信し、コンテンツを投稿するための関数を呼び出す
    onPost(content);
    setContent(""); // フォームをクリア
  };

  console.log("CommentForm");

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-4 rounded-md">
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="内容を入力してください"
        className="w-full bg-gray-100 p-2 rounded-md"
      />
      <button
        type="submit"
        className="bg-gray-600 text-white py-2 px-4 rounded-md"
      >
        投稿
      </button>
    </form>
  );
};

export default CommentForm;
