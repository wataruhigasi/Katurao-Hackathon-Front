import React, { FC, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

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
  backgroundColor: "blue",
};

const cardDraggingStyle: React.CSSProperties = {
  ...cardStyle,
  opacity: 0,
};

const textStyle: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "bold",
  width: `${CARD_WIDTH}px`,
  height: `${CARD_HEIGHT}px`,
};

export const CARD_TYPE = "Card";

export type CardItem = {
  coordinates: {
    top: number;
    left: number;
  };
  DataUrl: string;
  id: string;
};

export const DraggableCard: FC<{
  top: number;
  left: number;
  DataUrl: string;
  id: string;
}> = ({ top, left, DataUrl, id }) => {
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
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [top, left, DataUrl, id]
  );

  console.log(top, left, DataUrl, id);
  useEffect(() => {
    preview(getEmptyImage());
  }, []);

  return (
    <div
      style={isDragging ? cardDraggingStyle : { ...cardStyle, top, left }}
      ref={drag}
    >
      <p>
        <img src={DataUrl} alt="SVG Image" />
      </p>
    </div>
  );
};
