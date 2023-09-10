import React from "react";

const Comment = ({ index, name, time, content }) => {
  return (
    <div className="bg-gray-200 p-4 mb-4">
      <div>
        <strong>番号:</strong> {index + 1}
      </div>
      <div>
        <strong>名前:</strong> {name}
      </div>
      <div>
        <strong>時間:</strong> {time}
      </div>
      <div>
        <strong>内容:</strong> {content}
      </div>
    </div>
  );
};

export default Comment;
