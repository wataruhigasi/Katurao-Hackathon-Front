import React, { FC } from "react";
import { useDragLayer } from "react-dnd";
import { CardItem } from "./DragCard";

const cardStyle: React.CSSProperties = {
  position: "absolute",
  boxSizing: "border-box",
  display: "grid",
  placeItems: "center",
  width: "100px",
  height: "50px",
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

  const { top, left } = item.coordinates;
  const { x, y } = offsetDifference;

  return (
    <div
      style={{
        ...cardStyle,
        left: `${left}px`,
        top: `${top}px`,
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      <p style={textStyle}>{item.name}</p>
    </div>
  );
};

export default DragLayer;
