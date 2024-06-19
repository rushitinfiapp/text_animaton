import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const TextAnimationCanvas = () => {
  const canvasRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(null);

  // useEffect(() => {
  //   const canvasElement = canvasRef.current;
  //   const canvas = new fabric.Canvas(canvasElement, {
  //     width: 600,
  //     height: 400,
  //   });

  //   let newText = 'Your paragraph text';
  //   const newTextObject = new fabric.Textbox(newText, {
  //     left: 50,
  //     top: 50,
  //     width: 500,
  //     fontSize: 30,
  //     lineHeight: 1.3,
  //     fontFamily: 'Arial',
  //     fill: 'blue',
  //     opacity: 1,
  //   });

  //   canvas.add(newTextObject);

  //   if (showAnimation) {
  //     newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
  //       const fadeRate = 0.02;
  //       const maxBlur = 8;
  //       const charObjects = [];
  //       const lines = this?._textLines;
  //       const lineHeights = this?.__lineHeights;
  //       const lineWidths = this?.__lineWidths;

  //       if (!lines || !lineHeights || !lineWidths) {
  //         console.error('Text lines or dimensions are not available.');
  //         return;
  //       }

  //       const objectCenter = this.getCenterPoint();
  //       const initialLeft = objectCenter.x - this.width / 2;
  //       let yOffset = objectCenter.y - this.height / 2;

  //       lines.forEach((line, lineIndex) => {
  //         let charLeft = initialLeft;
  //         if (lineIndex > 0) {
  //           yOffset += lineHeights[lineIndex - 1] * this.lineHeight;
  //         }
  //         for (let i = 0; i < line.length; i++) {
  //           const char = line[i];
  //           const charObject = new fabric.Text(char, {
  //             left: charLeft,
  //             top: yOffset,
  //             fontSize: this.fontSize,
  //             fill: this.fill,
  //             fontFamily: this.fontFamily,
  //             opacity: 0,
  //             shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //             selectable: false,
  //             stroke: this.stroke,
  //             fontWeight: this.fontWeight,
  //           });
  //           charObjects.push(charObject);
  //           canvas.add(charObject);

  //           charLeft += charObject.width;
  //         }
  //       });

  //       let step = 0;
  //       const fadeInOrder = Array.from({ length: charObjects.length }, (_, i) => i).sort(() => Math.random() - 0.5);

  //       const animateFrame = () => {
  //         fadeInOrder.forEach((charIndex, orderIndex) => {
  //           if (step >= orderIndex) {
  //             const charObject = charObjects[charIndex];
  //             const progress = Math.min(1, (step - orderIndex) * fadeRate);
  //             const blurLevel = maxBlur * (1 - progress);

  //             charObject.set({
  //               opacity: progress,
  //               shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //             });
  //           }
  //         });

  //         canvas.renderAll();

  //         if (step < charObjects.length + 1 / fadeRate) {
  //           step++;
  //           requestAnimationFrame(animateFrame);
  //         } else {
  //           this.set({ opacity: 1 });
  //           canvas.remove(...charObjects);
  //           canvas.renderAll();
  //         }
  //       };

  //       requestAnimationFrame(() => {
  //         animateFrame();
  //       });
  //     };

  //     newTextObject._renderChar();
  //   } else if (showAnimation === false) {
  //     newTextObject.set({ opacity: 1 });
  //     canvas.clear();
  //     canvas.renderAll();
  //   }

  //   return () => {
  //     if (canvas) {
  //       canvas.clear();
  //       canvas.dispose();
  //     }
  //   };
  // }, [showAnimation]);


  // useEffect(() => {
  //   const canvasElement = canvasRef.current;
  //   const canvas = new fabric.Canvas(canvasElement, {
  //     width: 600,
  //     height: 400,
  //   });

  //   let newText = 'Your paragraph text';
  //   const newTextObject = new fabric.Textbox(newText, {
  //     left: 50,
  //     top: 50,
  //     width: 500,
  //     fontSize: 30,
  //     lineHeight: 1.3,
  //     fontFamily: 'Arial',
  //     fill: 'blue',
  //     opacity: 1,
  //   });

  //   canvas.add(newTextObject);

  //   if (showAnimation) {
  //     newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
  //       const fadeRate = 0.01; 
  //       const maxBlur = 8;
  //       const charObjects = [];
  //       const lines = this?._textLines;
  //       const lineHeights = this?.__lineHeights;
  //       const lineWidths = this?.__lineWidths;

  //       if (!lines || !lineHeights || !lineWidths) {
  //         console.error('Text lines or dimensions are not available.');
  //         return;
  //       }

  //       const objectCenter = this.getCenterPoint();
  //       const initialLeft = objectCenter.x - this.width / 2;
  //       let yOffset = objectCenter.y - this.height / 2;

  //       lines.forEach((line, lineIndex) => {
  //         let charLeft = initialLeft;
  //         if (lineIndex > 0) {
  //           yOffset += lineHeights[lineIndex - 1] * this.lineHeight;
  //         }
  //         for (let i = 0; i < line.length; i++) {
  //           const char = line[i];
  //           const charObject = new fabric.Text(char, {
  //             left: charLeft,
  //             top: yOffset,
  //             fontSize: this.fontSize,
  //             fill: this.fill,
  //             fontFamily: this.fontFamily,
  //             opacity: 0,
  //             shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //             selectable: false,
  //             stroke: this.stroke,
  //             fontWeight: this.fontWeight,
  //           });
  //           charObjects.push(charObject);
  //           canvas.add(charObject);

  //           charLeft += charObject.width;
  //         }
  //       });

  //       let step = 0;
  //       const fadeInOrder = Array.from({ length: charObjects.length }, (_, i) => i).sort(() => Math.random() - 0.5);

  //       const animateFrame = () => {
  //         fadeInOrder.forEach((charIndex, orderIndex) => {
  //           if (step >= orderIndex) {
  //             const charObject = charObjects[charIndex];
  //             const progress = Math.min(1, (step - orderIndex) * fadeRate);
  //             const blurLevel = maxBlur * (1 - progress);

  //             charObject.set({
  //               opacity: progress,
  //               shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //             });
  //           }
  //         });

  //         canvas.renderAll();

  //         if (step < charObjects.length + 1 / fadeRate) {
  //           step++;
  //           requestAnimationFrame(animateFrame);
  //         } else {
  //           this.set({ opacity: 1 });
  //           canvas.remove(...charObjects);
  //           canvas.renderAll();
  //         }
  //       };

  //       requestAnimationFrame(() => {
  //         animateFrame();
  //       });
  //     };

  //     newTextObject._renderChar();
  //   } else if (showAnimation === false) {
  //     newTextObject.set({ opacity: 1 });
  //     canvas.clear();
  //     canvas.renderAll();
  //   }

  //   return () => {
  //     if (canvas) {
  //       canvas.clear();
  //       canvas.dispose();
  //     }
  //   };
  // }, [showAnimation]);


  // useEffect(() => {
  //   const canvasElement = canvasRef.current;
  //   const canvas = new fabric.Canvas(canvasElement, {
  //     width: 600,
  //     height: 400,
  //   });

  //   let newText = 'Your paragraph text';
  //   const newTextObject = new fabric.Textbox(newText, {
  //     left: 50,
  //     top: 50,
  //     width: 500,
  //     fontSize: 30,
  //     lineHeight: 1.3,
  //     fontFamily: 'Arial',
  //     fill: 'blue',
  //     opacity: 1,
  //   });

  //   canvas.add(newTextObject);

  //   if (showAnimation) {
  //     newTextObject._renderChar = function (method, ctx, lineIndex, charIndex, _char, left, top) {
  //       const fadeRate = 0.01;
  //       const maxBlur = 8;
  //       const charObjects = [];
  //       const lines = this?._textLines;
  //       const lineHeights = this?.__lineHeights;
  //       const lineWidths = this?.__lineWidths;

  //       if (!lines || !lineHeights || !lineWidths) {
  //         console.error('Text lines or dimensions are not available.');
  //         return;
  //       }

  //       const objectCenter = this.getCenterPoint();
  //       const initialLeft = objectCenter.x - this.width / 2;
  //       let yOffset = objectCenter.y - this.height / 2;

  //       lines.forEach((line, lineIndex) => {
  //         let charLeft = initialLeft;
  //         if (lineIndex > 0) {
  //           yOffset += lineHeights[lineIndex - 1] * this.lineHeight;
  //         }
  //         for (let i = 0; i < line.length; i++) {
  //           const char = line[i];
  //           const charObject = new fabric.Text(char, {
  //             left: charLeft,
  //             top: yOffset,
  //             fontSize: this.fontSize,
  //             fill: this.fill,
  //             fontFamily: this.fontFamily,
  //             opacity: 0,
  //             shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //             selectable: false,
  //             stroke: this.stroke,
  //             fontWeight: this.fontWeight,
  //           });
  //           charObjects.push(charObject);
  //           canvas.add(charObject);

  //           charLeft += charObject.width;
  //         }
  //       });

  //       let step = 0;
  //       const fadeInOrder = Array.from({ length: charObjects.length }, (_, i) => i).sort(() => Math.random() - 0.5);

  //       const animateFrame = () => {
  //         fadeInOrder.forEach((charIndex, orderIndex) => {
  //           if (step >= orderIndex) {
  //             const charObject = charObjects[charIndex];
  //             const progress = Math.min(1, (step - orderIndex) * fadeRate);
  //             const blurLevel = maxBlur * (1 - progress);

  //             charObject.set({
  //               opacity: progress,
  //               shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //             });
  //           }
  //         });

  //         canvas.renderAll();

  //         if (step < charObjects.length + 1 / fadeRate) {
  //           step++;
  //           requestAnimationFrame(animateFrame);
  //         } else {
  //           this.set({ opacity: 1 });
  //           canvas.remove(...charObjects);
  //           canvas.renderAll();
  //         }
  //       };

  //       requestAnimationFrame(() => {
  //         animateFrame();
  //       });
  //     };

  //     newTextObject._renderChar();
  //   } else if (showAnimation === false) {
  //     newTextObject.set({ opacity: 1 });
  //     canvas.clear();
  //     canvas.renderAll();
  //   }

  //   return () => {
  //     if (canvas) {
  //       canvas.clear();
  //       canvas.dispose();
  //     }
  //   };
  // }, [showAnimation]);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const canvas = new fabric.Canvas(canvasElement, {
      width: 600,
      height: 400,
    });

    const newText = 'Your paragraph text';
    const textObject = new fabric.Textbox(newText, {
      left: 50,
      top: 50,
      width: 500,
      fontSize: 30,
      lineHeight: 1.3,
      fontFamily: 'Arial',
      fill: 'blue',
      opacity: 0, // Start with opacity 0 for animation
    });

    canvas.add(textObject);

    if (showAnimation) {
      animateText(canvas, textObject);
    } else {
      textObject.set({ opacity: 1 }); // Show text without animation
      canvas.renderAll();
    }

    return () => {
      canvas.dispose();
    };
  }, [showAnimation]);

  const animateText = (canvas, textObject) => {
    let fullText = textObject._text || ''; // Use _text property if available
    if (typeof fullText !== 'string') {
      fullText = String(fullText); // Convert to string if not already
    }
    const chars = fullText.split('');
  
    // Hide original text object
    textObject.set({ opacity: 0 });
    canvas.renderAll();
  
    const fontSize = textObject.fontSize;
    const leftOffset = textObject.left;
    const topOffset = textObject.top;
  
    // Remove any existing charObjects beyond the current characters
    canvas.getObjects().forEach(obj => {
      if (obj !== textObject && !chars.includes(obj.text)) {
        canvas.remove(obj);
      }
    });
  
    // Ensure charObjectMap exists to store charObjects
    const charObjectMap = {};
  
    chars.forEach((char, index) => {
      let charObject = charObjectMap[char];
  
      if (!charObject) {
        charObject = new fabric.Text(char, {
          left: leftOffset + index * fontSize * 0.6, // Adjust spacing as needed
          top: topOffset,
          fontFamily: textObject.fontFamily,
          fontSize: fontSize,
          fill: textObject.fill,
          opacity: 0,
        });
  
        charObjectMap[char] = charObject;
        canvas.add(charObject); // Add new charObject to canvas
      }
  
      // Delay each character animation using setTimeout
      setTimeout(() => {
        fabric.util.animate({
          startValue: 0,
          endValue: 1,
          duration: 500, // Adjust animation duration as needed
          onChange: function(value) {
            charObject.set({ opacity: value });
            canvas.renderAll();
          },
          onComplete: function() {
            charObject.set({ opacity: 1 });
            canvas.renderAll();
          },
        });
      }, index * 100); // Adjust delay between characters
    });
  };
  



  const toggleAnimation = () => {
    setShowAnimation((prev) => !prev);
  };

  useEffect(() => {
    console.log("showAnimation", showAnimation)
  }, [showAnimation])

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="canvas-id"
        width={600}
        height={400}
        style={{ border: '1px solid #ccc' }}
      />
      <button onClick={toggleAnimation}>
        {showAnimation ? 'Stop Animation' : 'Start Animation'}
      </button>
    </div>
  );
};

export default TextAnimationCanvas;
