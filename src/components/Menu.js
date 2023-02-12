import { useEffect, useRef, useState } from "react";
import React from "react";
import "../App.css";
import { conditionalExpression } from "@babel/types";
const resizeImageData = require('resize-image-data')

const Menu = ({  setLineWidth, Clear, MainCanvas }) => {
  
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
  const getImage = () => {
    const canvas = MainCanvas.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
    
    const resizedImage = resizeImageData(imageData, 28, 28, 'bilinear-interpolation')
    var grayScale = [];
    for(var i=0; i<resizedImage.data.length; i+=4){
      grayScale.push(resizedImage.data[i+3]);
    }
    console.log(JSON.stringify(grayScale));


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
        onClick={() => {getImage() }}
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