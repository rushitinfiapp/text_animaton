import React, { useEffect, useRef, useState } from "react";
import initialData from './data'
import Text from '../extra/TextInput';
import AnimationText4 from "../assets/animationStyle/animationText4.webp";
import "./style.css";
import DesignCanvas from "./CanvasPage";

export default function HomePage() {

  const [data, setData] = useState(initialData.children || []);

  const createElements = () => {
    return data.map(model => {
      if (model.type === 'text') {
        return <Text key={model.id} model={model} />;
      } else {
        return null;
      }
    });
  };


  const [animationStyle, setAnimationStyle] = useState({
    clarifyAnimation: false,
  });

  const handleAnimationStyleClick = (type) => {
    if (type === "clarify") {
      setAnimationStyle({
        ...animationStyle,
        clarifyAnimation: true,
      });
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
          <DesignCanvas showGrid={true} setAnimationStyle={setAnimationStyle} animationStyle={animationStyle}>{createElements()}</DesignCanvas>
        </div>
      </div>
    </div>
  );
}