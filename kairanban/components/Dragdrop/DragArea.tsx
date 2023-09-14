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
import axios from "axios";

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
          const newData = {
            top: top,
            left: left,
            DataUrl: DataUrl,
            id: id,
          };
          setCardData((cardData) => [...cardData, newData]);
        });
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
        setCardData([]);
      }
    };

    fetchData();
  }, []);

  const PatchData = async (coord, item) => {
    console.log("patch", coord, item);
    const Endpoint = `http://localhost:8080/article/${item.id}/position`;

    const PatchRequestData = {
      x: coord.x,
      y: coord.y,
    };

    try {
      const response = await axios.patch(Endpoint, PatchRequestData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

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
          console.log("cord", item);
          setCardData((prev) => [
            ...prev.filter((data) => data.id !== item.id),
            {
              top: coord.y,
              left: coord.x,
              DataUrl: item.DataUrl,
              id: item.id,
            },
          ]);
          PatchData(coord, item);
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
