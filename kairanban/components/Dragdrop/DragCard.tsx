import React, { FC, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Link, useNavigate } from "react-router-dom";

export const CARD_WIDTH = 480;
export const CARD_HEIGHT = 678.72;

const cardStyle: React.CSSProperties = {
  position: "absolute",
  boxSizing: "border-box",
  display: "grid",
  placeItems: "center",
  width: `${CARD_WIDTH}px`,
  height: `${CARD_HEIGHT}px`,
  color: "white",
  backgroundColor: "white",
  border: "2px solid black",
  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
};

const cardStyleThreads: React.CSSProperties = {
  position: "absolute",
  boxSizing: "border-box",
  display: "grid",
  placeItems: "center",
  width: "300px",
  height: "300px",
  color: "white",
  backgroundColor: "white",
  border: "2px solid black",
  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
};

const cardDraggingStyle: React.CSSProperties = {
  ...cardStyle,
  opacity: 0,
};

export const CARD_TYPE = "Card";

export type CardItem = {
  coordinates: {
    top: number;
    left: number;
  };
  DataUrl: string;
  id: string;
  flag: boolean;
  opacity: number;
};

export const DraggableCard: FC<{
  top: number;
  left: number;
  DataUrl: string;
  id: string;
  flag: boolean;
  opacity?: number;
}> = ({ top, left, DataUrl, id, flag, opacity }) => {
  // const navigate = useNavigate();
  const [{ isDragging }, drag, preview] = useDrag<
    CardItem,
    Record<string, never>,
    { isDragging: boolean }
  >(
    () => ({
      type: CARD_TYPE,
      item: {
        coordinates: {
          top,
          left,
        },
        DataUrl,
        id,
        flag,
        opacity,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [top, left, DataUrl, id, flag, opacity]
  );

  useEffect(() => {
    preview(getEmptyImage());
  }, []);

  const handleClick = (id) => {
    console.log("Clicked");
    location.replace(`http://localhost:3000/keijiban/threads/${id}`);
    // navigate("/threads/id");
  };

  return (
    <div
      style={
        isDragging
          ? cardDraggingStyle
          : flag
          ? { ...cardStyleThreads, top, left, opacity }
          : { ...cardStyle, top, left, opacity }
      }
      ref={(node) => {
        drag(node);
      }}
      onClick={flag ? () => handleClick(id) : undefined}
    >
      <p>
        <img src={DataUrl} alt="SVG Image" />
      </p>
    </div>
  );
};
