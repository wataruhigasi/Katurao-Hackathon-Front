"use client";
import exp from "constants";
import React from "react";
import { useState } from "react";
import axios from "axios";
import DoneButton from "../../../../components/Button";

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
    <div className="bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="max-w-4xl w-full h-full p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-black">スレッド作成</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold">
              タイトル
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-bold">
              内容
            </label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-black h-64"
            />
          </div>
          <div className="text-right">
            <DoneButton />
          </div>
        </form>
      </div>
    </div>
  );
}
