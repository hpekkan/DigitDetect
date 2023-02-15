import { useEffect, useRef, useState } from "react";
import "../App.css";
  
function InfoArea() {
  const handleClick = () => {
    window.open("https://github.com/hpekkan/DigitDetect",'_blank');
  }
  
  return (
    <div className="InfoArea">
      <h1>DigitDetect</h1>
      <p className="first-p"> The <span>DigitDetect</span> allows users to input handwritten digits through a canvas 
      element. The input is then sent to a <span>Keras</span> model via a <span>FastAPI</span> server, which performs the digit recognition.
      The user interface is built with <span>React</span>, allowing for a smooth and intuitive user experience. <span>Axios</span> is used to
      handle HTTP requests between the React frontend and FastAPI backend. FastAPI serves as the main server for the application,
      handling the request from the canvas and forwarding it to the Keras model for processing. The results of the digit recognition
      are then sent back to the frontend for display. Overall, this web application demonstrates the power of integrating various modern
      web technologies to create a functional and efficient digit recognition system.</p>
      <p className="second-p">
      To use the DigitDetect, simply paint a digit in the "Draw Hub" and hit the "Guess" button. The recognition
      result will be displayed right next to the button. Give it a try and see how accurate the model is!
      </p>
           <p className="github">
            <span onClick={handleClick} > GitHub/DigitDetect </span>
           </p>
    </div>
  );
}
  
export default InfoArea;