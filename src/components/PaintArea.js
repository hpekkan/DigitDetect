import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import "../App.css";
  
function PaintArea() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(20);
  const [canvasWidth, setCanvasWidth] = useState(512);
  const [canvasHeight, setCanvasHeight] = useState(512);
  const [drawClass, setdrawClass] = useState("draw-area");


  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      
      if(window.innerHeight > 700){
        setCanvasWidth(512);
        setCanvasHeight(512);
        setdrawClass("draw-area");
        setLineWidth(20);
        
      }else if(window.innerHeight > 650){
        setCanvasWidth(452);
        setCanvasHeight(452);
        setdrawClass("draw-area-452");
        setLineWidth(18);
      }else if(window.innerHeight > 600){
        setCanvasWidth(400);
        setCanvasHeight(400);
        setdrawClass("draw-area-400");
        setLineWidth(16);
      }else if(window.innerHeight > 550){
        setCanvasWidth(352);
        setCanvasHeight(352);
        setdrawClass("draw-area-352");
        setLineWidth(14);
      }else if(window.innerHeight > 500){
        setCanvasWidth(300);
        setCanvasHeight(300);
        setdrawClass("draw-area-300");
        setLineWidth(10);
      }else if(window.innerHeight > 450){
        setCanvasWidth(256);
        setCanvasHeight(256);
        setdrawClass("draw-area-256");
        setLineWidth(8);
      }else{
        setCanvasWidth(128);
        setCanvasHeight(128);
        setdrawClass("draw-area-128");
        setLineWidth(6);
      }
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = lineWidth;

    ctxRef.current = ctx;
  }, [canvasHeight, canvasWidth,lineWidth]);
  
  // Function for starting the drawing
  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(
      e.nativeEvent.offsetX, 
      e.nativeEvent.offsetY
    );
    setIsDrawing(true);
  };
  const Clear = (e) => {
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }
  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };
  
  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(
      e.nativeEvent.offsetX, 
      e.nativeEvent.offsetY
    );
      
    ctxRef.current.stroke();
  };
  
  return (
    <div className="PaintArea">
      <h1>Draw Hub</h1>
      <Menu
          Clear={Clear}
          MainCanvas = {canvasRef}
          MainCtxT = {ctxRef}
        />
      <p>Use the Entire Canvas for Optimal Predictions with DigitDetect</p>
      <div className={drawClass}>
        <canvas 
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
    </div>
  );
}
  
export default PaintArea;