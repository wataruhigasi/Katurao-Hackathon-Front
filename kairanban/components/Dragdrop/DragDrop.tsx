import React, { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DroppableArea from "./DragArea";

export const DragDropBox: FC = () => {
  return (
    <div className="DragDropBox">
      <DndProvider backend={HTML5Backend}>
        <DroppableArea />
      </DndProvider>
    </div>
  );
};

export default DragDropBox;
