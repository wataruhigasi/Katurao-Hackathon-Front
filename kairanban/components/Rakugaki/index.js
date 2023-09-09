import React, { useRef, useState, useEffect } from "react";

const Canvas = ({ width, height }) => {
  const [widths, setWidth] = useState(width);
  useEffect(() => {
    const viewportheight = window.innerHeight;
    const pxValue = (widths * viewportheight) / 100;
    setWidth(pxValue);
  }, []);
  let canvasRef = useRef(null);
  let mouseX = null;
  let mouseY = null;

  const getContext = () => {
    const canvas = canvasRef.current;
    return canvas.getContext("2d");
  };

  const OnClick = (e) => {
    if (e.button === 0) {
      return;
    }
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = ~~(e.clientX - rect.left);
    const y = ~~(e.clientY - rect.top);
    Draw(x, y);
  };

  const OnMove = (e) => {
    if (e.buttons !== 1) {
      return;
    }
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = ~~(e.clientX - rect.left);
    const y = ~~(e.clientY - rect.top);
    Draw(x, y);
  };

  const DrawEnd = (e) => {
    mouseX = null;
    mouseY = null;
  };

  const Draw = (x, y) => {
    const ctx = getContext();
    ctx.globalAlpha = 1.0;
    if (mouseX === null || mouseY === null) {
      ctx.moveTo(x, y);
    } else {
      ctx.moveTo(mouseX, mouseY);
    }
    ctx.lineTo(x, y);
    ctx.lineCap = "round";
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    mouseX = x;
    mouseY = y;
  };

  return (
    <section>
      <div>
        <canvas
          onMouseDown={OnClick}
          onMouseMove={OnMove}
          onMouseUp={DrawEnd}
          onMouseOut={DrawEnd}
          ref={canvasRef}
          width={`${width * 10}px`}
          height={`${height * 10}px`}
        />
      </div>
    </section>
  );
};

export default Canvas;
