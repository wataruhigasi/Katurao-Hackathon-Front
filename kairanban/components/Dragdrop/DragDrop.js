import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Example from "./index.js";

export default function DragDropBox({ width, height }) {
  console.log("DragDropBox", width, height);
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Example width={1000} height={1000} />
      </DndProvider>
    </div>
  );
}
