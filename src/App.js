import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

let selectedObject;
export default function TextAnimation() {
  // const [selectedObject, setSelectedObject] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const fabricCanvas = useRef(null);

  // useEffect(() => {
  //   const canvas = new fabric.Canvas('canvas-id', {
  //     width: 400,
  //     height: 400,
  //   });
  //   fabricCanvas.current = canvas;

  //   let newText = 'Your paragraph text'; // Initial text
  //   const newTextObject = new fabric.Textbox(newText, {
  //     left: 50,
  //     top: 50,
  //     fontSize: 30,
  //     fontFamily: 'Arial',
  //     fill: 'blue',
  //     opacity: 1,
  //   });
  //   canvas.add(newTextObject);

  //   newTextObject.animatingChars = [];
  //   const animationDuration = 1000;

  //   newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
  //     if (this.animatingChars && this.animatingChars[lineIndex] && this.animatingChars[lineIndex][charIndex]) {
  //       const animData = this.animatingChars[lineIndex][charIndex];
  //       const currentTime = Date.now();
  //       const animateProgress = (currentTime - animData.animateStart) / animationDuration;

  //       if (animateProgress >= 0 && animateProgress <= 1) {
  //         animData.opacity = animateProgress;
  //       } else if (animateProgress > 1) {
  //         animData.opacity = 1;
  //       }

  //       ctx.save();
  //       ctx.globalAlpha = 1;
  //       ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  //       ctx.shadowBlur = animData.blur;
  //       console.log("animData", animData)
  //       fabric.Text.prototype._renderChar.call(this, method, ctx, lineIndex, charIndex, _char, left, top);

  //       ctx.restore();
  //     } else {
  //       fabric.Text.prototype._renderChar.call(this, method, ctx, lineIndex, charIndex, _char, left, top);
  //     }
  //   };

  //   function initializeAnimationData() {
  //     const textLines = newTextObject.text.split('\n');
  //     newTextObject.animatingChars = textLines.map((line, lineIndex) =>
  //       line.split('').map((char, charIndex) => ({
  //         opacity: 0,
  //         blur: 10,
  //         animateStart: Date.now() + lineIndex * 50 + charIndex * 20,
  //       }))
  //     );
  //   }

  //   initializeAnimationData();

  //   let animationRequestId = null;

  //   function animateCharacters() {
  //     if (newTextObject.animatingChars) {
  //       newTextObject.animatingChars.forEach((line, lineIndex) => {
  //         line.forEach((animData, charIndex) => {
  //           const currentTime = Date.now();
  //           const animateProgress = (currentTime - animData.animateStart) / animationDuration;

  //           if (animateProgress >= 0 && animateProgress <= 1) {
  //             animData.opacity = animateProgress;
  //           } else if (animateProgress > 1) {
  //             animData.opacity = 1;
  //           }
  //         });
  //       });

  //       canvas.requestRenderAll();
  //       animationRequestId = requestAnimationFrame(animateCharacters);
  //     }
  //   }

  //   animateCharacters();

  //   canvas.on('selection:created', handleSelection);
  //   canvas.on('selection:updated', handleSelection);
  //   canvas.on('selection:cleared', handleSelection);

  //   function handleSelection(e) {
  //     // Handle selection events if needed
  //   }

  //   return () => {
  //     cancelAnimationFrame(animationRequestId); // Stop animation loop on unmount
  //     canvas.dispose(); // Clean up Fabric.js resources
  //   };
  // }, [showAnimation]);

  useEffect(() => {
    const canvas = new fabric.Canvas('canvas-id', {
      width: 400,
      height: 400,
    });
    fabricCanvas.current = canvas;
  
    let newText = 'Your paragraph text'; // Initial text
    const newTextObject = new fabric.Textbox(newText, {
      left: 50,
      top: 50,
      fontSize: 30,
      fontFamily: 'Arial',
      fill: 'blue',
      opacity: 1,
    });
    canvas.add(newTextObject);
  
    newTextObject.animatingChars = [];
    const animationDuration = 1000;
  console.log("newTextObject",newTextObject)
    newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
      if (this.animatingChars && this.animatingChars[lineIndex] && this.animatingChars[lineIndex][charIndex]) {
        const animData = this.animatingChars[lineIndex][charIndex];
        const currentTime = Date.now();
        const animateProgress = (currentTime - animData.animateStart) / animationDuration;
  
        if (animateProgress >= 0 && animateProgress <= 1) {
          animData.opacity = animateProgress;
        } else if (animateProgress > 1) {
          animData.opacity = 1;
        }
  
        ctx.save();
        ctx.globalAlpha = animData.opacity;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = animData.blur;
  
        fabric.Text.prototype._renderChar.call(this, method, ctx, lineIndex, charIndex, _char, left, top);
  
        ctx.restore();
      } else {
        fabric.Text.prototype._renderChar.call(this, method, ctx, lineIndex, charIndex, _char, left, top);
      }
    };
  
    function initializeAnimationData() {
      const textLines = newTextObject.text.split('\n');
      newTextObject.animatingChars = textLines.map((line, lineIndex) =>
        line.split('').map((char, charIndex) => ({
          opacity: 0,
          blur: 10,
          animateStart: Date.now() + lineIndex * 50 + charIndex * 20,
        }))
      );
    }
  
    initializeAnimationData();
  
    let animationRequestId = null;
  
    function animateCharacters() {
      if (newTextObject.animatingChars) {
        newTextObject.animatingChars.forEach((line, lineIndex) => {
          line.forEach((animData, charIndex) => {
            const currentTime = Date.now();
            const animateProgress = (currentTime - animData.animateStart) / animationDuration;
  
            if (animateProgress >= 0 && animateProgress <= 1) {
              animData.opacity = animateProgress;
            } else if (animateProgress > 1) {
              animData.opacity = 1;
            }
          });
        });
  
        canvas.requestRenderAll();
        animationRequestId = requestAnimationFrame(animateCharacters);
      }
    }
  
    animateCharacters();
  
    canvas.on('selection:created', handleSelection);
    canvas.on('selection:updated', handleSelection);
    canvas.on('selection:cleared', handleSelection);
  
    function handleSelection(e) {
      // Handle selection events if needed
    }
  
    return () => {
      cancelAnimationFrame(animationRequestId); // Stop animation loop on unmount
      canvas.dispose(); // Clean up Fabric.js resources
    };
  }, [showAnimation]);

  // useEffect(() => {
  //   if (showAnimation && selectedObject) {
  //     startAnimation();
  //   }
  // }, [showAnimation, selectedObject]);

  const startAnimation = () => {
    const canvas = fabricCanvas.current;
    if (!canvas || !selectedObject) return;

    const fadeRate = 0.02;
    const animationTypeSpeed = 60;
    const originalOpacity = selectedObject.opacity;

    selectedObject.animatingChars = [];
    selectedObject._textLines.forEach((line, lineIndex) => {
      selectedObject.animatingChars[lineIndex] = [];
      for (let i = 0; i < line.length; i++) {
        selectedObject.animatingChars[lineIndex][i] = {
          opacity: 0,
          blur: 8,
        };
      }
    });

    let step = 0;
    const fadeInOrder = Array.from({ length: selectedObject.text.length }, (_, i) => i).sort(() => Math.random() - 0.5);

    const animateChars = () => {
      console.log("sdfg", selectedObject.animatingChars);
      fadeInOrder.forEach((charIndex, orderIndex) => {
        if (step >= orderIndex) {
          const lineIndex = Math.floor(charIndex / selectedObject._textLines[0].length);
          const charLineIndex = charIndex % selectedObject._textLines[0].length;
          console.log("sdfg", { lineIndex, charLineIndex });
          const animData = selectedObject?.animatingChars[lineIndex][charLineIndex];
          const progress = Math.min(1, (step - orderIndex) * fadeRate);
          animData.opacity = progress;
          animData.blur = 8 * (1 - progress);
        }
      });

      canvas.requestRenderAll();

      if (step < selectedObject.text.length + 1 / fadeRate) {
        step++;
        setTimeout(animateChars, animationTypeSpeed);
      } else {
        selectedObject.set({ opacity: originalOpacity });
        selectedObject.animatingChars = null;
        canvas.requestRenderAll();
      }
    };

    selectedObject.set({ opacity: 1 });
    canvas.requestRenderAll();
    animateChars();
  };

  const stopAnimation = () => {
    // Implement stop animation logic if needed
    console.log('Animation stopped');
  };

  return (
    <div>
      <button onClick={() => setShowAnimation(!showAnimation)}>
        Animation
      </button>
      <canvas id='canvas-id' width={600} height={400}></canvas>
    </div>
  );
}