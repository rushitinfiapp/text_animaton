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

  // useEffect(() => {
  //   const canvasElement = canvasRef.current;
  //   const canvas = new fabric.Canvas(canvasElement, {
  //     width: 600,
  //     height: 400,
  //   });

  //   let newText = 'Your paragraph text';
  //   const fontSize = 30;
  //   const maxBlur = 8;
  //   const fadeRate = 0.05; // Adjusted fade rate for animation

  //   const textObject = new fabric.Textbox('', {
  //     left: 50,
  //     top: 50,
  //     width: 500,
  //     fontSize: fontSize,
  //     lineHeight: 1.3,
  //     fontFamily: 'Arial',
  //     fill: 'blue',
  //     opacity: 0, // Start with opacity 0 for fade-in effect
  //     selectable: false,
  //     fontWeight: 'normal',
  //   });

  //   canvas.add(textObject); // Add textObject to canvas

  //   const animateText = () => {
  //     let currentIndex = 0;
  //     const chars = newText.split('');

  //     const animateNextCharacter = () => {
  //       if (currentIndex < chars.length) {
  //         const currentText = textObject.text || '';
  //         const nextText = currentText + chars[currentIndex];
  //         textObject.set('text', nextText);

  //         let step = 0;
  //         const animateFrame = () => {
  //           const progress = Math.min(1, step * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);

  //           textObject.set({
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });

  //           canvas.renderAll();

  //           if (step < 1 / fadeRate) {
  //             step++;
  //             requestAnimationFrame(animateFrame);
  //           } else {
  //             textObject.set('shadow', null); // Remove shadow after animation completes
  //             canvas.renderAll();
  //             currentIndex++;
  //             setTimeout(animateNextCharacter, 50); // Interval between characters
  //           }
  //         };

  //         requestAnimationFrame(animateFrame);
  //       } else {
  //         // Animation completed
  //         setTimeout(() => {
  //           textObject.set('opacity', 1); // Set opacity to 1
  //           canvas.renderAll(); // Render canvas with full text
  //         }, 500); // Delay after all characters are animated
  //       }
  //     };

  //     animateNextCharacter(); // Start animating characters
  //   };

  //   if (showAnimation) {
  //     animateText(); // Start the animation
  //   } else {
  //     // Show textObject immediately without animation
  //     textObject.set('text', newText); // Set the full text to textObject
  //     textObject.set('opacity', 1); // Set opacity to 1
  //     textObject.set('shadow', null); // Remove shadow
  //     canvas.renderAll(); // Render canvas immediately with full text
  //   }

  //   return () => {
  //     canvas.dispose(); // Clean up canvas on unmount
  //   };
  // }, [showAnimation]);

  // useEffect(() => {
  //   const canvasElement = canvasRef.current;
  //   const canvas = new fabric.Canvas(canvasElement, {
  //     width: 600,
  //     height: 400,
  //   });

  //   let newText = 'Your paragraph text';
  //   const fontSize = 30;
  //   const maxBlur = 8;
  //   const fadeRate = 0.05; // Adjusted fade rate for animation

  //   const textObject = new fabric.Textbox('', {
  //     left: 50,
  //     top: 50,
  //     width: 500,
  //     fontSize: fontSize,
  //     lineHeight: 1.3,
  //     fontFamily: 'Arial',
  //     fill: 'blue',
  //     opacity: 0, // Start with opacity 0 for fade-in effect
  //     selectable: false,
  //     fontWeight: 'normal',
  //   });

  //   canvas.add(textObject); // Add textObject to canvas

  //   const animateText = () => {
  //     const chars = newText.split('');
  //     let currentIndex = 0;

  //     const animateNextCharacter = () => {
  //       if (currentIndex < chars.length) {
  //         const char = chars[currentIndex];
  //         const leftOffset = textObject.left + currentIndex * fontSize; // Fixed left position
  //         const topOffset = textObject.top; // Fixed top position

  //         const textChar = new fabric.Text(char, {
  //           left: leftOffset,
  //           top: topOffset,
  //           fontSize: fontSize,
  //           fill: 'blue',
  //           opacity: 0, // Start with opacity 0 for fade-in effect
  //           selectable: false,
  //           shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`, // Initial shadow setup
  //           fontFamily: 'Arial',
  //           fontWeight: 'normal',
  //         });

  //         canvas.add(textChar); // Add character to canvas

  //         textChar.animate('opacity', 1, {
  //           duration: 500 + Math.random() * 500, // Random duration for each character
  //           onChange: canvas.renderAll.bind(canvas), // Render canvas on change
  //           onComplete: () => {
  //             let step = 0;
  //             const animateFrame = () => {
  //               const progress = Math.min(1, step * fadeRate);
  //               const blurLevel = maxBlur * (1 - progress);

  //               textChar.set({
  //                 shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //               });

  //               canvas.renderAll();

  //               if (step < 1 / fadeRate) {
  //                 step++;
  //                 requestAnimationFrame(animateFrame);
  //               } else {
  //                 textChar.set('shadow', null); // Remove shadow after animation completes
  //                 canvas.renderAll();
  //               }
  //             };

  //             requestAnimationFrame(animateFrame);
  //           },
  //         });

  //         currentIndex++;
  //         setTimeout(animateNextCharacter, 50); // Interval between characters
  //       } else {
  //         setTimeout(() => {
  //           textObject.set('text', newText); // Set the full text to textObject
  //           textObject.set('opacity', 1); // Set opacity to 1
  //           textObject.set('shadow', null); // Remove shadow
  //           canvas.renderAll(); // Render canvas with full text
  //         }, 1000); // Delay after all characters are animated
  //       }
  //     };

  //     animateNextCharacter(); // Start animating characters
  //   };

  //   if (showAnimation) {
  //     animateText(); // Start the animation
  //   } else {
  //     // Show textObject immediately without animation
  //     textObject.set('text', newText); // Set the full text to textObject
  //     textObject.set('opacity', 1); // Set opacity to 1
  //     textObject.set('shadow', null); // Remove shadow
  //     canvas.renderAll(); // Render canvas immediately with full text
  //   }

  //   return () => {
  //     canvas.dispose(); // Clean up canvas on unmount
  //   };
  // }, [showAnimation]);
  // useEffect(() => {
  //   const canvasElement = canvasRef.current;
  //   const canvas = new fabric.Canvas(canvasElement, {
  //     width: 600,
  //     height: 400,
  //   });

  //   const newText = 'Your paragraph text';
  //   const fontSize = 30;
  //   const maxBlur = 8;
  //   const fadeDuration = 500; // Duration for fade-in animation
  //   const fadeDelay = 50; // Delay between showing characters

  //   const textObject = new fabric.Text('', {
  //     left: 50, // Start from the left side
  //     top: canvas.height / 2 - fontSize / 2, // Center vertically
  //     originX: 'left', // Align origin to left for animation
  //     fontSize: fontSize,
  //     lineHeight: 1.3,
  //     fontFamily: 'Arial',
  //     fill: 'blue',
  //     opacity: 0, // Start with opacity 0
  //     selectable: false,
  //     fontWeight: 'normal',
  //   });

  //   canvas.add(textObject); // Add textObject to canvas

  //   let animationInProgress = false;
  //   let animationCancelled = false;

  //   const animateNextCharacter = (charIndex) => {
  //     if (charIndex < newText.length && !animationCancelled) {
  //       const char = newText[charIndex];

  //       textObject.set('text', textObject.text + char); // Append character to textObject

  //       fabric.util.animate({
  //         startValue: 0,
  //         endValue: 1,
  //         duration: fadeDuration,
  //         onChange: (value) => {
  //           if (!animationCancelled) {
  //             textObject.set('opacity', value); // Fade-in effect

  //             canvas.forEachObject((obj) => {
  //               if (obj === textObject) return; // Skip the current text object

  //               const blurLevel = obj === textObject ? 0 : maxBlur; // Calculate blur level
  //               const visibility = charIndex === newText.length - 1 ? 1 : value; // Ensure last character is fully visible

  //               obj.set({
  //                 shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, ${1 - visibility})`, // Apply blur effect based on visibility
  //                 opacity: visibility // Set visibility of the character
  //               });
  //             });

  //             canvas.renderAll();
  //           }
  //         },
  //         onComplete: () => {
  //           if (!animationCancelled) {
  //             setTimeout(() => {
  //               animateNextCharacter(charIndex + 1); // Recursively animate next character
  //             }, fadeDelay);
  //           }
  //         },
  //       });
  //     } else {
  //       animationInProgress = false;
  //     }
  //   };

  //   const startAnimation = () => {
  //     if (!animationInProgress) {
  //       animationCancelled = false;
  //       textObject.set('text', ''); // Clear textObject
  //       textObject.set('opacity', 0); // Reset opacity
  //       animateNextCharacter(0); // Start animating characters from the beginning
  //     }
  //   };

  //   const stopAnimation = () => {
  //     animationCancelled = true;
  //     animationInProgress = false;
  //     textObject.set('opacity', 0); // Immediately hide textObject
  //     canvas.forEachObject((obj) => {
  //       obj.set({
  //         shadow: null, // Remove blur effect from all objects
  //         opacity: 1 // Reset opacity of all objects
  //       });
  //     });
  //     canvas.renderAll();
  //   };

  //   if (showAnimation) {
  //     startAnimation(); // Start the animation if showAnimation is true
  //   } else {
  //     stopAnimation(); // Stop the animation if showAnimation is false
  //   }

  //   return () => {
  //     canvas.dispose(); // Clean up canvas on unmount
  //   };
  // }, [showAnimation]);

  // useEffect(() => {
  //   const canvasElement = canvasRef.current;
  //   const canvas = new fabric.Canvas(canvasElement, {
  //     width: 600,
  //     height: 400,
  //   });

  //   const newText = 'Your paragraph text';
  //   const fontSize = 30;
  //   const fadeDuration = 1000;
  //   const maxBlur = 8;

  //   const textObject = new fabric.Text(newText, {
  //     left: 50,
  //     top: canvas.height / 2 - fontSize / 2,
  //     fontSize: fontSize,
  //     lineHeight: 1.3,
  //     fontFamily: 'Arial',
  //     fill: 'blue',
  //     opacity: 0,
  //     selectable: false,
  //     fontWeight: 'normal',
  //   });

  //   canvas.add(textObject);

  //   let animationInProgress = false;
  //   let animationCancelled = false;

  //   const startAnimation = () => {
  //     if (!animationInProgress) {
  //       animationCancelled = false;
  //       textObject.set('opacity', 0);
  //       textObject.set('shadow', `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`);

  //       fabric.util.animate({
  //         startValue: 0,
  //         endValue: 1,
  //         duration: fadeDuration,
  //         onChange: (value) => {
  //           if (!animationCancelled) {
  //             textObject.set('opacity', value);

  //             const blurLevel = maxBlur * (1 - value);
  //             textObject.set('shadow', `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`);

  //             canvas.renderAll();
  //           }
  //         },
  //         onComplete: () => {
  //           // Start simultaneous left and right blur animation
  //           animateLeftAndRight();
  //         },
  //       });

  //       animationInProgress = true;
  //     }
  //   };

  //   const animateLeftAndRight = () => {
  //     const animationDuration = 500; // Duration for left and right animation

  //     fabric.util.animate({
  //       startValue: 0,
  //       endValue: 1,
  //       duration: animationDuration,
  //       onChange: (value) => {
  //         if (!animationCancelled) {
  //           const blurLevel = maxBlur * (1 - value);

  //           // Left side animation
  //           textObject.set('shadow', `-${blurLevel}px 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`);

  //           // Right side animation
  //           textObject.set('shadow', `${blurLevel}px 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`);

  //           canvas.renderAll();
  //         }
  //       },
  //       onComplete: () => {
  //         // Animation complete
  //       },
  //     });
  //   };

  //   const stopAnimation = () => {
  //     animationCancelled = true;
  //     animationInProgress = false;
  //     textObject.set('opacity', 0);
  //     textObject.set('shadow', null);
  //     canvas.renderAll();
  //   };

  //   if (showAnimation) {
  //     startAnimation();
  //   } else {
  //     stopAnimation();
  //   }

  //   return () => {
  //     canvas.dispose();
  //   };
  // }, [showAnimation]);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const canvas = new fabric.Canvas(canvasElement, {
      width: 600,
      height: 400,
    });
  
    let newText = 'Your paragraph text';
    const newTextObject = new fabric.Textbox(newText, {
      left: 50,
      top: 50,
      width: 500,
      fontSize: 30,
      lineHeight: 1.3,
      fontFamily: 'Arial',
      fill: 'blue',
      opacity: 0, // Start with opacity 0 to fade in
      selectable: false, // Ensure characters are not selectable individually
    });
  
    canvas.add(newTextObject);
  
    if (showAnimation) {
      const chars = newText.split('');
      const maxBlur = 8;
      const fadeRate = 0.02;
      let step = 0;
  
      // Function to animate characters sequentially
      const animateCharacters = () => {
        const textChars = newTextObject.text.split('');
  
        const animateChar = () => {
          textChars.forEach((char, index) => {
            // Calculate opacity and blur level based on step
            const progress = Math.min(1, (step - index) * fadeRate);
            const blurLevel = maxBlur * (1 - progress);
  
            // Set selection styles for the character
            newTextObject.setSelectionStyles({
              fill: 'blue', // Example: Maintain original fill color
              opacity: progress,
              shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
            }, index, index + 1);
  
            canvas.renderAll();
          });
  
          if (step < textChars.length + 1 / fadeRate) {
            step++;
            requestAnimationFrame(animateChar);
          } else {
            // Animation complete
            newTextObject.set({ opacity: 1 });
            canvas.renderAll();
          }
        };
  
        animateChar();
      };
  
      animateCharacters();
    } else if (showAnimation === false) {
      newTextObject.set({ opacity: 1 });
      canvas.clear();
      canvas.renderAll();
    }
  
    return () => {
      if (canvas) {
        canvas.clear();
        canvas.dispose();
      }
    };
  }, [showAnimation]);
  

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
