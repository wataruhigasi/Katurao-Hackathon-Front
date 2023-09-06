"use client";
import exp from "constants";
import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Articles() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const Endpoint = "http://localhost:8000/api/articles";

    const formData = {
      title: title,
      context: content,
    };

    try {
      const response = await axios.post(Endpoint, formData);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log(formData);
      console.log(error);
    }
  };

  return (
    <div>
      <h1>記事フォーム</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>内容</label>
          <textarea value={content} onChange={handleContentChange} />
        </div>
        <div>
          <button type="submit">投稿</button>
        </div>
      </form>
    </div>
  );
}
