import React, { useEffect, useRef, useState } from "react";
import initialData from './data'
import Text from '../extra/TextInput';
import AnimationText3 from "../assets/animationStyle/animationText3.webp";
import AnimationText4 from "../assets/animationStyle/animationText4.webp";
import "./style.css";
import DesignCanvas from "./CanvasPage";

export default function HomePage() {

  const [data, setData] = useState(initialData.children || []);
  const [selectedObject, setSelectedObject] = useState(null);
  const canvasRef = useRef(null);

  const createElements = () => {
    return data.map(model => {
      if (model.type === 'text') {
        return <Text canvasRef={canvasRef.current} key={model.id} selectedObject={selectedObject} setAnimationStyle={setAnimationStyle} model={model} animationStyle={animationStyle} />;
      } else {
        return null;
      }
    });
  };
  const [animationStyle, setAnimationStyle] = useState({
    clarifyAnimation: false,
    fadeAnimation: false
  });

  const handleAnimationStyleClick = (type) => {
    switch (type) {
      case "clarify":
        setAnimationStyle({
          ...animationStyle,
          clarifyAnimation: true,
        });
        break;
      case "fade":
        setAnimationStyle({
          ...animationStyle,
          fadeAnimation: true,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="homePage">
      <div className="animationFilter">
        <div className="textBox">
          <div className="animationText fontStyle">
            <h6>Animation Text</h6>
            <div className="styleFont">
              <div className="fontBox">
                <button
                  className={`${animationStyle.fadeAnimation ? "fontBoxButtonActive" : ""
                    }`}
                  style={{ opacity: `${animationStyle.fadeAnimation === true ? "0.6" : "1"}` }}
                  disabled={animationStyle.fadeAnimation === true ? true : false}
                  onClick={() => handleAnimationStyleClick("fade")}
                >
                  <img src={AnimationText3} draggable={false} />
                </button>
                <span>Fade</span>
              </div>
              <div className="fontBox">
                <button
                  className={`${animationStyle.clarifyAnimation ? "fontBoxButtonActive" : ""
                    }`}
                  style={{ opacity: `${animationStyle.clarifyAnimation === true ? "0.6" : "1"}` }}
                  disabled={animationStyle.clarifyAnimation === true ? true : false}
                  onClick={() => handleAnimationStyleClick("clarify")}
                >
                  <img src={AnimationText4} draggable={false} />
                </button>
                <span>Clarify</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="showCanvas">
        <div className="showPage">
          <DesignCanvas showGrid={true} selectedObject={selectedObject} setSelectedObject={setSelectedObject} setAnimationStyle={setAnimationStyle} animationStyle={animationStyle}>{createElements()}</DesignCanvas>
        </div>
      </div>
    </div>
  );
}