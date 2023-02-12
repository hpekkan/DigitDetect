import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import "../App.css";
  
function PaintArea() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);

  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [ lineWidth]);
  
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
      <h1>Draw Area</h1>
      <Menu
          setLineWidth={setLineWidth}
          Clear={Clear}
          MainCanvas = {canvasRef}
        />
      <div className="draw-area">
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={`512px`}
          height={`512px`}
        />
      </div>
    </div>
  );
}
  
export default PaintArea;