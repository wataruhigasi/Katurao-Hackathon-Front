import React from "react";

const Comment = ({ index, name, date, content }) => {
  return (
    <div className="bg-gray-100 p-4 mb-4 rounded shadow-md">
      <div className="flex items-center mb-2">
        <span className="font-semibold text-blue-600 mr-2">#{index + 1}:</span>
        <span className="text-gray-600">{date}</span>
      </div>
      <div className="flex items-center mb-2">
        <div className="text-gray-800">{name}</div>
        <div className="text-gray-800"> :{content}</div>
      </div>
    </div>
  );
};

export default Comment;
