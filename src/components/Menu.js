import { useEffect, useRef, useState } from "react";
import React from "react";
import "../App.css";
import axios from "axios";
const resizeImageData = require('resize-image-data')

const Menu = ({  setLineWidth, Clear, MainCanvas, MainCtxT }) => {
  const [guess, setGuess] = useState(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;
    ctx.opacity = 1;
    ctx.font = "40px Arial";
    ctxRef.current = ctx;
    ctx.beginPath();
  }, []);

  useEffect(() => {
    if (guess !== null) {
      draw(guess);
    }
  }, [guess]);
  const clearClick = () => {
    Clear();
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }
  const draw = (e) => {
    if(e>9){
      ctxRef.current.fillText(e, 0, 34);
    }else {
      ctxRef.current.fillText(e, 8, 34);
    }
  };
  const handleGuess = async (grayscaleArray) => {
    var ans = -1;
    await axios.post('http://127.0.0.1:8000/prediction/', {
      image: grayscaleArray
    })
    .then(function (response) {
      console.log(response);
      ans = parseInt(response.data.data.prediction); 
      
    })
    .catch(function (error) {
      console.log(error);
    });
    return ans;
  };
  const getImage = async () => {
    const canvas = MainCanvas.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
    
    const resizedImage = resizeImageData(imageData, 28, 28, 'bilinear-interpolation')
    const grayScale = [];
    for(var i=0; i<resizedImage.data.length; i+=4){
      grayScale.push(resizedImage.data[i+3]);
    }
    const prediction = await handleGuess(grayScale);
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    draw(prediction);
    setGuess(prediction);
  };
  return (
    <div className="Menu">
      
      <button
        type='button'
        onClick={() => { clearClick();}}
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
          width={`40px`}
          height={`40px`}
        />
      </div>
      
    </div>
  );
};
  
export default Menu;