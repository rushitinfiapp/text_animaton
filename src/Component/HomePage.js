import React, { useEffect, useRef, useState } from "react";
import Font1 from "../assets/fontStyle/font1.webp";
import Font2 from "../assets/fontStyle/font2.webp";
import Font3 from "../assets/fontStyle/font3.webp";
import Slider from "@mui/material/Slider";
import initialData from './data'
import Text from '../extra/TextInput';
import AnimationText1 from "../assets/animationStyle/animationText1.webp";
import AnimationText2 from "../assets/animationStyle/animationText2.webp";
import AnimationText3 from "../assets/animationStyle/animationText3.webp";
import AnimationText4 from "../assets/animationStyle/animationText4.webp";
import "./style.css";
import { Stack } from "@mui/material";
import PageCom from "./PageCom";
import { fabric } from "fabric";
import DesignCanvas from "./CanvasPage";

export default function HomePage() {

  const [data, setData] = useState(initialData.children || []);
  const animationText = useRef(null)
  const addNewText = () => {
      const newText = {
        id: `text-${data.length + 1}`,
        name: `text-${data.length + 1}`,
        type: 'text',
        text: 'New Text',
        fontFamily: 'Arial',
        fontSize: 14,
        width: 100,
        textAlign: 'center',
        height: 50,
        x: 50,
        y: 50,
      };
    return setData(prevData => [...prevData, newText]);
  };

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
  const [animationSpeed, setAnimationSpeed] = useState(30);

  const handleSliderChange = (event, newValue) => {
    setAnimationSpeed(newValue);
  };

  // useEffect(() => {
  //   const canvas = animationText.current;
  //   const ctx = canvas.getContext("2d");
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.font = "30px Arial";
  //   ctx.fillStyle = "black";

  //   if (animationStyle.clarifyAnimation) {
  //     const text = "Hello, How Are You !!";
  //     const yPos = 80;
  //     const fadeRate = 0.02;
  //     const maxBlur = 5;
  //     const moveDistance = 20;
  //     const animationTypeSpeed = 50;
  //     const textWidth = ctx.measureText(text).width;
  //     const startX = (canvas.width - textWidth) / 2;
  //     const charPositions = [];
  //     for (let i = 0; i < text.length; i++) {
  //       charPositions.push({ x: startX + ctx.measureText(text.substring(0, i)).width, opacity: 0 });
  //     }
  //     const fadeInAni = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  //     let step = 0;
  //     const animationInterval = setInterval(() => {
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);

  //       for (let i = 0; i < text.length; i++) {
  //         const charIndex = fadeInAni[i];
  //         const baseXPos = charPositions[charIndex].x;
  //         const xPosChar = baseXPos - moveDistance + (moveDistance * Math.min(1, charPositions[charIndex].opacity));

  //         if (step >= i) {
  //           charPositions[charIndex].opacity = Math.min(1, charPositions[charIndex].opacity + fadeRate);
  //           const blurLevel = maxBlur * (1 - charPositions[charIndex].opacity);
  //           ctx.globalAlpha = charPositions[charIndex].opacity;
  //           ctx.filter = `blur(${blurLevel}px)`;
  //         } else {
  //           ctx.globalAlpha = 0;
  //           ctx.filter = `blur(${maxBlur}px)`;
  //         }

  //         ctx.fillText(text[charIndex], xPosChar, yPos);
  //       }

  //       if (step >= text.length && charPositions.every(char => char.opacity >= 1)) {
  //         clearInterval(animationInterval);
  //       }

  //       step++;
  //     }, animationTypeSpeed);
  //   }
  //   ctx.fillText("Hello, How Are You !!", 10, 80);
  // }, [animationSpeed, animationStyle]);

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
          {/* <div className="fontStyle">
            <h6>Font Styles</h6>
          </div> */}
          <div className="animationText fontStyle">
            <h6>Animation Text</h6>
            <div className="styleFont">
              {/* <div className="fontBox">
                <button
                  className={`${animationStyle.riseAnimation ? "fontBoxButtonActive" : ""
                    }`}
                  style={{opacity:"0.5"}}
                  disabled={true}
                    onClick={() => handleAnimationStyleClick("rise")}
                >
                  <img src={AnimationText1} draggable={false} />
                </button>
                <span>Rise</span>
              </div>
              <div className="fontBox">
                <button
                  className={`${animationStyle.panAnimation ? "fontBoxButtonActive" : ""
                    }`}
                  style={{opacity:"0.5"}}
                  disabled={true}
                    onClick={() => handleAnimationStyleClick("pan")}
                >
                  <img src={AnimationText2} draggable={false} />
                </button>
                <span>Pan</span>
              </div>
              <div className="fontBox">
                <button
                  className={`${animationStyle.fadeAnimation ? "fontBoxButtonActive" : ""
                    }`}
                  style={{opacity:"0.5"}}
                  disabled={true}
                    onClick={() => handleAnimationStyleClick("fade")}
                >
                  <img src={AnimationText3} draggable={false} />
                </button>
                <span>Fade</span>
              </div> */}
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
            {/* <div className="speedProgress">
              <Stack spacing={2}>
                <h6>Speed</h6>
                <Slider
                  aria-label="Volume"
                  sx={{ color: "#8b3dff", width: "200px" }}
                  value={animationSpeed}
                  onChange={handleSliderChange}
                />
              </Stack>
            </div> */}
          </div>
        </div>
      </div>
      {/* <PageCom animationText={animationText} /> */}
      <div className="showCanvas">
        <div className="showPage">
          <DesignCanvas showGrid={true} setAnimationStyle={setAnimationStyle} animationStyle={animationStyle}>{createElements()}</DesignCanvas>
        </div>
      </div>
    </div>
  );
}