"use client";
import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const boxStyle = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move",
  color: "red",
};

function Example(width) {
  console.log(width);
  const [box, setBox] = useState({ top: 100, left: 20 });

  const [, drag] = useDrag({
    type: "box",
    item: { top: box.top, left: box.left },
  });

  const [, drop] = useDrop(() => ({
    accept: "box",
    drop(item, monitor) {
      //ドラックの状態管理 monitor
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        setBox({ top, left });
      }
    },
  }));

  const containerStyle = {
    width: width.width * 10,
    height: width.height * 10,
  };
  console.log("containerStyle", containerStyle);

  return (
    <div ref={drop} style={containerStyle}>
      <div ref={drag} style={{ ...boxStyle, top: box.top, left: box.left }}>
        Drag me around
      </div>
    </div>
  );
}

export default Example;
