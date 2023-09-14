import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DroppableArea from "../Dragdrop/DragArea";

export const DragDropBox: Fc = ({ width, height }) => {
  console.log("DragDropBox", width, height);
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <DroppableArea />
      </DndProvider>
    </div>
  );
};
