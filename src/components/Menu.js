import React from "react";
import "../App.css";
  
const Menu = ({  setLineWidth,clear }) => {
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
        onClick={() => { clear();}}
      >
        Clear
      </button>
      
      
    </div>
  );
};
  
export default Menu;