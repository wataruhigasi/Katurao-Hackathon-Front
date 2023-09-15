import React, { FC } from "react";
import { useDragLayer } from "react-dnd";
import { CardItem, CARD_WIDTH, CARD_HEIGHT } from "./DragCard";

const cardStyle: React.CSSProperties = {
  position: "absolute",
  boxSizing: "border-box",
  display: "grid",
  placeItems: "center",
  width: `${CARD_WIDTH}px`,
  height: `${CARD_HEIGHT}px`,
  color: "white",
  backgroundColor: "#2bff00",
  willChange: "transform",
};

const cardStyleThreads: React.CSSProperties = {
  position: "absolute",
  boxSizing: "border-box",
  display: "grid",
  placeItems: "center",
  width: "300px",
  height: "300px",
  color: "white",
  backgroundColor: "#2bff00",
  willChange: "transform",
};

const textStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "bold",
};

const DragLayer: FC = () => {
  const { item, offsetDifference, isDragging } = useDragLayer((monitor) => ({
    item: monitor.getItem() as CardItem,
    offsetDifference: monitor.getDifferenceFromInitialOffset() || {
      x: 0,
      y: 0,
    },
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !offsetDifference || !item) {
    return null;
  }

  const flag = item.flag;
  // アイテムの位置
  const { top, left } = item.coordinates;
  // アイテムのドラッグ中にマウスカーソルが移動した座標の差分
  const { x, y } = offsetDifference;

  return (
    <div
      style={
        flag
          ? {
              ...cardStyleThreads,
              left: `${left}px`,
              top: `${top}px`,
              transform: `translate(${x}px, ${y}px)`,
            }
          : {
              ...cardStyle,
              left: `${left}px`,
              top: `${top}px`,
              transform: `translate(${x}px, ${y}px)`,
            }
      }
    >
      <p style={textStyle}>{item.DataUrl}</p>
    </div>
  );
};

export default DragLayer;
