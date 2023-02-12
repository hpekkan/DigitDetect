import { useEffect, useRef, useState } from "react";
import React from "react";
import "../App.css";
  
const Menu = ({  setLineWidth, Clear }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;
    ctx.opacity = 1;
    ctx.font = "24px Arial";
    ctxRef.current = ctx;
    ctx.beginPath();
  }, []);
  const draw = (e) => {
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if(e>9){
      ctxRef.current.fillText(e, 0, 21);
    }else {
      ctxRef.current.fillText(e, 8, 21);
    }
  };
  return (
    <div className="Menu">
      
      <label>Brush Width </label>
      <input
        type="range"
        min="3"
        max="20"
        defaultValue ="5"
        onChange={(e) => {
          setLineWidth(e.target.value);
        }}
      />
      <button
        type='button'
        onClick={() => { Clear();}}
      >
        Clear
      </button>
      <button
        type='button'
        onClick={() => { draw(10);}}
      >
        Guess
      </button>
      <div className="draw-area">
        <canvas
          ref={canvasRef}
          width={`28px`}
          height={`28px`}
        />
      </div>
      
    </div>
  );
};
  
export default Menu;