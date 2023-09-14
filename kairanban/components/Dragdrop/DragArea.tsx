import React, { FC, useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import {
  CardItem,
  CARD_TYPE,
  DraggableCard,
  CARD_WIDTH,
  CARD_HEIGHT,
} from "../Dragdrop/DragCard";
import DragLayer from "../Dragdrop/DragLayer";
import { data } from "autoprefixer";

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
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Endpoint = "http://localhost:8080/articles";
        const response = await fetch(Endpoint);

        if (!response.ok) {
          throw new Error(
            `ネットワーク応答が正しくありませんでした：${response.status}`
          );
        }

        const data = await response.json();
        data.map((article) => {
          console.log(article);
          const top = article.position.x;
          const left = article.position.y;
          const DataUrl = `data:image/svg+xml,${encodeURIComponent(
            article.body
          )}`;
          const id = String(article.id);
          const newData = { top: top, left: left, DataUrl: DataUrl, id: id };
          setCardData((cardData) => [...cardData, newData]);
        });
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
        setCardData([]);
      }
    };

    fetchData();
  }, []);

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
    </svg>
  `;

  const dataUri = `data:image/svg+xml,${encodeURIComponent(svgString)}`;

  const [, drop] = useDrop<CardItem, void, Record<string, never>>(
    () => ({
      accept: [CARD_TYPE],
      drop: (item, monitor) => {
        const coord = monitor.getSourceClientOffset();
        if (coord === null) return;
        if (
          coord.x < 0 ||
          coord.x > AREA_SIDE_LENGTH - CARD_WIDTH ||
          coord.y < 0 ||
          coord.y > AREA_SIDE_LENGTH - CARD_HEIGHT
        ) {
          return;
        }
        if (coord) {
          setCardData((prev) => [
            ...prev.filter((data) => data.id !== item.id),
            {
              top: coord.y,
              left: coord.x,
              DataUrl: item.DataUrl,
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
      {cardData.map(({ top, left, DataUrl, id }) => (
        <DraggableCard
          key={id}
          top={top}
          left={left}
          DataUrl={DataUrl}
          id={id}
        />
      ))}
    </div>
  );
};

export default DroppableArea;
