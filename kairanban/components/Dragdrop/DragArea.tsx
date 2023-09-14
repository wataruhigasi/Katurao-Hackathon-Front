import React, { FC, useState } from "react";
import { useDrop } from "react-dnd";
import { CardItem, CARD_TYPE, DraggableCard } from "../Dragdrop/DragCard";
import DragLayer from "../Dragdrop/DragLayer";

const AREA_SIDE_LENGTH = 10000;

const areaStyle: React.CSSProperties = {
  position: "absolute",
  display: "grid",
  placeItems: "center",
  width: `${AREA_SIDE_LENGTH}px`,
  height: `${AREA_SIDE_LENGTH}px`,
  top: 0,
  left: 0,
};

const DroppableArea: FC = () => {
  const [cardData, setCardData] = useState([
    { top: 100, left: 100, name: "CARD1", id: "1" },
    { top: 200, left: 200, name: "CARD2", id: "2" },
  ]);
  const [, drop] = useDrop<CardItem, void, Record<string, never>>(
    () => ({
      accept: [CARD_TYPE],
      drop: (item, monitor) => {
        const coord = monitor.getSourceClientOffset();
        if (coord === null) return;
        if (
          coord.x < 0 ||
          coord.x > AREA_SIDE_LENGTH - 100 ||
          coord.y < 0 ||
          coord.y > AREA_SIDE_LENGTH - 50
        ) {
          return;
        }
        if (coord) {
          setCardData((prev) => [
            ...prev.filter((data) => data.id !== item.id),
            {
              top: coord.y,
              left: coord.x,
              name: item.name,
              id: item.id,
            },
          ]);
        }
      },
    }),
    [setCardData]
  );
  return (
    <div style={areaStyle} ref={drop}>
      <DragLayer />
      {cardData.map(({ top, left, name, id }) => (
        <DraggableCard key={id} top={top} left={left} name={name} id={id} />
      ))}
    </div>
  );
};

export default DroppableArea;
