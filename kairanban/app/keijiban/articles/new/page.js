"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import DoneButton from "../../../../components/Button/FormButton";

export default function Articles() {
  const [title, setTitle] = useState("");
  const [body, setContent] = useState("");
  const [position, setPosition] = useState({ x: 100, y: 20 });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const Endpoint = "http://localhost:8080/article";

    const formData = {
      title: title,
      body: body,
      position: position,
    };

    try {
      const response = await axios.post(Endpoint, formData);
      console.log(response);
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
        <h1 className="text-2xl font-semibold mb-4 text-black">記事フォーム</h1>
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
            <label htmlFor="body" className="block text-gray-700 font-bold">
              内容
            </label>
            <textarea
              id="body"
              value={body}
              onChange={handleContentChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-black h-64"
            />
          </div>
          <div className="text-right">
            <DoneButton onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
}
