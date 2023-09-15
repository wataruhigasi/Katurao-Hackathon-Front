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

// 日付の差分を計算する関数で、return 値は opacity の値になる
const compareDates = (now, createdAt) => {
  const diffInDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
  console.log("diffInDays", diffInDays);

  if (diffInDays >= 10) {
    return 0;
  } else {
    return 1 - diffInDays * 0.1;
  }
};

const DroppableArea: FC = () => {
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    const fetchArticlesData = async () => {
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
          const now = new Date();
          const createdAt = new Date(article.created_at);
          const newOpacity = compareDates(now, createdAt);

          const newData = {
            top: top,
            left: left,
            DataUrl: DataUrl,
            id: `${id}article`,
            flag: false,
            opacity: newOpacity,
          };
          console.log(newData);
          setCardData((cardData) => [...cardData, newData]);
        });
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
        setCardData([]);
      }
    };
    const fetchtThreadsData = async () => {
      try {
        const Endpoint = "http://localhost:8080/threads";
        const response = await fetch(Endpoint);

        if (!response.ok) {
          throw new Error(
            `ネットワーク応答が正しくありませんでした：${response.status}`
          );
        }

        const data = await response.json();
        console.log("fetchtThreadsData", data);
        data.map((thread) => {
          console.log(thread);
          const top = thread.position.x;
          const left = thread.position.y;
          const DataUrl = `data:image/svg+xml,${encodeURIComponent(
            thread.title
          )}`;
          const id = String(thread.id);

          const now = new Date();
          const createdAt = new Date(thread.created_at);
          const newOpacity = compareDates(now, createdAt);

          const newData = {
            top: top,
            left: left,
            DataUrl: DataUrl,
            id: id,
            flag: true,
            opacity: newOpacity,
          };
          console.log(newData);
          setCardData((cardData) => [...cardData, newData]);
        });
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
        setCardData([]);
      }
    };

    fetchArticlesData();
    fetchtThreadsData();
  }, []);

  console.log("cardData", cardData);

  const PatchArticleData = async (coord, item) => {
    console.log("coord", coord, item);
    var result = item.id.replace("article", "");
    const Endpoint = `http://localhost:8080/article/${result}/position`;

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

  const PatchThreadData = async (coord, item) => {
    console.log("coord", coord, item);
    const Endpoint = `http://localhost:8080/thread/${item.id}/position`;

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
        console.log("dragitem", item);
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
          setCardData((prev) => {
            console.log("prev", prev);
            return [
              ...prev.filter((data) => data.id !== item.id),
              {
                top: coord.y,
                left: coord.x,
                DataUrl: item.DataUrl,
                id: item.id,
                flag: item.flag,
                opacity: item.opacity,
              },
            ];
          });
          if (item.id.indexOf("article") > -1) {
            console.log("1");
            PatchArticleData(coord, item);
          } else {
            PatchThreadData(coord, item);
          }
        }
      },
    }),
    [setCardData]
  );
  return (
    <div style={areaStyle} ref={drop}>
      <DragLayer />
      {cardData.map(({ top, left, DataUrl, id, flag, opacity }) => (
        <DraggableCard
          key={id}
          top={top}
          left={left}
          DataUrl={DataUrl}
          id={id}
          flag={flag}
          opacity={opacity}
        />
      ))}
    </div>
  );
};

export default DroppableArea;
