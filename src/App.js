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
  //           console.log("")
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
  //     opacity: 1, // Initial opacity set to 1 to ensure text is visible
  //   });

  //   canvas.add(newTextObject);

  //   const chars = newText.split('');
  //   const fadeRate = 0.05;
  //   const maxBlur = 20;
  //   let charOpacities = new Array(chars.length).fill(0);
  //   let charBlurs = new Array(chars.length).fill(maxBlur);
  //   const fadeInOrder = Array.from({ length: chars.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  //   let currentIndex = 0;
  //   if (showAnimation) {
  //     newTextObject._renderChar = function(method, ctx, lineIndex, charIndex, _char, left, top) {
  //       console.log("_char",_char)
  //       const progress = charOpacities[charIndex];
  //       const blurLevel = charBlurs[charIndex];
  //       ctx.globalAlpha = progress;
  //       ctx.shadowBlur = blurLevel;
  //       ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  //       fabric.Text.prototype._renderChar.call(this, method, ctx, lineIndex, charIndex, _char, left, top);
  //       ctx.globalAlpha = 1;
  //       ctx.shadowBlur = 0;
  //     };

  //     const animateFrame = () => {
  //       if (currentIndex < fadeInOrder.length) {
  //         const charIndex = fadeInOrder[currentIndex];
  //         charOpacities[charIndex] = Math.min(charOpacities[charIndex] + fadeRate, 1);
  //         charBlurs[charIndex] = maxBlur * (1 - charOpacities[charIndex]);

  //         if (charOpacities[charIndex] >= 1) {
  //           currentIndex++;
  //         }
  //       }

  //       canvas.renderAll();

  //       if (currentIndex < fadeInOrder.length) {
  //         requestAnimationFrame(animateFrame);
  //       } else {
  //         newTextObject._renderChar = fabric.Text.prototype._renderChar;
  //       }
  //     };

  //     requestAnimationFrame(animateFrame);
  //   } else { // showAnimation is false
  //     newTextObject.set({ opacity: 1 }); // Show text immediately if animation is not starting
  //     canvas.renderAll();
  //   }

  //   return () => {
  //     canvas.clear();
  //     canvas.dispose();
  //   };
  // }, [showAnimation]);

  // useEffect(() => {
  //   const canvasElement = canvasRef.current;
  //   const canvas = new fabric.Canvas(canvasElement, {
  //     width: 600,
  //     height: 400,
  //   });

  //   const newText = 'Your paragraph text';
  //   const newTextObject = new fabric.Textbox(newText, {
  //     left: 50,
  //     top: 50,
  //     width: 500,
  //     fontSize: 30,
  //     lineHeight: 1.3,
  //     fontFamily: 'Arial',
  //     fill: 'blue',
  //     opacity: showAnimation ? 0 : 1, // Initially hide text if animation is starting
  //   });

  //   // Add text object to canvas
  //   canvas.add(newTextObject);

  //   // Handle animation logic
  //   if (showAnimation) {
  //     animateText(newTextObject, canvas);
  //   } else {
  //     // Show text immediately if animation is not starting
  //     newTextObject.set({ opacity: 1 });
  //     canvas.renderAll();
  //   }

  //   // Cleanup function
  //   return () => {
  //     canvas.dispose(); // Dispose canvas resources
  //   };
  // }, [showAnimation]);

  // const animateText = (textObject, canvas) => {
  //   // Animation variables
  //   const fadeInDuration = 2000; // Animation duration in milliseconds
  //   const framesPerSecond = 60;
  //   const fadeInFrames = fadeInDuration / (1000 / framesPerSecond);
  //   let currentFrame = 0;

  //   // Animation function
  //   const animateFrame = () => {
  //     currentFrame++;
  //     const opacity = currentFrame / fadeInFrames; // Calculate opacity based on current frame

  //     textObject.set({ opacity: opacity }); // Set text opacity
  //     canvas.renderAll(); // Render canvas with updated opacity

  //     if (currentFrame < fadeInFrames) {
  //       requestAnimationFrame(animateFrame); // Continue animation until all frames are rendered
  //     }
  //   };

  //   // Start animation
  //   animateFrame();
  // };






  // useEffect(() => {
  //   const canvasElement = canvasRef.current;
  //   const canvas = new fabric.Canvas(canvasElement, {
  //     width: 600,
  //     height: 400,
  //   });

  //   const newText = 'Your paragraph text';
  //   const characters = newText.split('');
  //   const textObjects = []; // Array to hold Fabric.js Text objects for each character

  //   // Create Fabric.js Text objects for each character
  //   characters.forEach((char, index) => {
  //     const text = new fabric.Text(char, {
  //       left: 50 + index * 20, // Adjust positioning for each character
  //       top: 50,
  //       fontSize: 30,
  //       fontFamily: 'Arial',
  //       fill: 'blue',
  //       opacity: 0, // Start with opacity 0 for animation effect
  //     });
  //     textObjects.push(text);
  //     canvas.add(text); // Add each character Text object to canvas
  //   });

  //   // Handle animation logic
  //   if (showAnimation) {
  //     animateCharacters(textObjects, canvas);
  //   } else {
  //     // Show text immediately if animation is not starting
  //     textObjects.forEach((text) => {
  //       text.set({ opacity: 1 });
  //     });
  //     canvas.renderAll();
  //   }

  //   // Cleanup function
  //   return () => {
  //     canvas.dispose(); // Dispose canvas resources
  //   };
  // }, [showAnimation]);

  // const animateCharacters = (textObjects, canvas) => {
  //   const fadeInDuration = 1000; // Animation duration in milliseconds
  //   const framesPerSecond = 60;
  //   const fadeInFrames = fadeInDuration / (1000 / framesPerSecond);
  //   const fadeDelay = fadeInDuration / textObjects.length; // Delay between each character fade-in
  //   let currentIndex = 0;

  //   // Function to animate each character individually
  //   const animateCharacter = (index) => {
  //     const textObject = textObjects[index];
  //     fabric.util.animate({
  //       startValue: 0,
  //       endValue: 1,
  //       duration: fadeInDuration,
  //       onChange: (value) => {
  //         textObject.set({ opacity: value }); // Update opacity gradually
  //         canvas.requestRenderAll(); // Request canvas to render updates
  //       },
  //       onComplete: () => {
  //         currentIndex++;
  //         if (currentIndex < textObjects.length) {
  //           animateCharacter(currentIndex); // Continue to next character
  //         }
  //       },
  //       easing: fabric.util.ease.easeInOutCubic, // Easing function
  //     });
  //   };

  //   // Start animation for the first character
  //   animateCharacter(0);
  // };




  // useEffect(() => {
  //   const canvasElement = canvasRef.current;
  //   const canvas = new fabric.Canvas(canvasElement, {
  //     width: 600,
  //     height: 400,
  //   });

  //   const initialText = 'Your paragraph text'; // Define the initial text
  //   const newTextObject = new fabric.Textbox(initialText, {
  //     left: 50,
  //     top: 50,
  //     width: 500,
  //     fontSize: 30,
  //     lineHeight: 1.3,
  //     fontFamily: 'Arial',
  //     fill: 'blue',
  //     opacity: 0, // Start with opacity 0 for animation effect
  //     originX: 'left', // Set origin to left for left-to-center animation
  //     shadow: '0px 0px 20px rgba(0,0,0,0.5)', // Initial shadow for blur effect
  //   });

  //   // Add the Textbox object to canvas
  //   canvas.add(newTextObject);

  //   // Handle animation logic
  //   if (showAnimation) {
  //     animateText(newTextObject, canvas); // Pass newTextObject for animation
  //   } else {
  //     // Show text immediately if animation is not starting
  //     newTextObject.set({ opacity: 1 });
  //     canvas.renderAll();
  //   }

  //   // Cleanup function
  //   return () => {
  //     canvas.dispose(); // Dispose canvas resources
  //   };
  // }, [showAnimation]);

  // const animateText = (textObject, canvas) => {
  //   const animationDuration = 1500; // Animation duration for each character in milliseconds
  //   const animationDelay = 100; // Delay between each character animation (adjust as needed)
  //   const chars = textObject.text.split(''); // Split text into individual characters
  //   let currentIndex = 0;

  //   // Function to animate each character individually
  //   const animateCharacters = () => {
  //     if (currentIndex < chars.length) {
  //       // Temporarily modify the Textbox content to show characters up to the current index
  //       const tempText = chars.slice(0, currentIndex + 1).join('');
  //       textObject.set({ text: tempText });

  //       // Animate opacity and shadow blur of the entire Textbox to simulate fade-in effect
  //       fabric.util.animate({
  //         startValue: { opacity: 0 },
  //         endValue: { opacity: 1 },
  //         duration: animationDuration,
  //         onChange: (value) => {
  //           // Update opacity and shadow blur of the Textbox
  //           textObject.set({ opacity: value.opacity });

  //           // Modify the shadow directly on the textObject
  //           textObject.shadow = `0px 0px ${20 * (1 - value.opacity)}px rgba(0,0,0,0.5)`;

  //           canvas.renderAll();
  //         },
  //         onComplete: () => {
  //           currentIndex++;
  //           setTimeout(animateCharacters, animationDelay); // Recursive call with delay
  //         },
  //         easing: fabric.util.ease.easeInOutCubic, // Easing function
  //       });
  //     }
  //   };

  //   // Start animation after a short delay to prevent blink
  //   setTimeout(animateCharacters, 100); // Adjust delay as needed
  // };



  // useEffect(() => {
  //   const canvasElement = canvasRef.current;
  //   const canvas = new fabric.Canvas(canvasElement, {
  //     width: 600,
  //     height: 400,
  //   });

  //   const initialText = 'Your paragraph text'; // Define the initial text
  //   const newTextObject = new fabric.Textbox(initialText, {
  //     left: 50,
  //     top: 50,
  //     width: 500,
  //     fontSize: 30,
  //     lineHeight: 1.3,
  //     fontFamily: 'Arial',
  //     fill: 'blue',
  //     opacity: 0, // Start with opacity 0 for animation effect
  //     originX: 'left', // Set origin to left for left-to-center animation
  //     shadow: '0px 0px 20px rgba(0,0,0,0.5)', // Initial shadow for blur effect
  //   });

  //   // Add the Textbox object to canvas
  //   canvas.add(newTextObject);

  //   // Handle animation logic
  //   if (showAnimation) {
  //     animateText(newTextObject, canvas); // Pass newTextObject for animation
  //   } else {
  //     // Show text immediately if animation is not starting
  //     newTextObject.set({ opacity: 1 });
  //     canvas.renderAll();
  //   }

  //   // Cleanup function
  //   return () => {
  //     canvas.dispose(); // Dispose canvas resources
  //   };
  // }, [showAnimation]);

  // const animateText = (textObject, canvas) => {
  //   const animationDuration = 1500; // Animation duration for each character in milliseconds
  //   const animationDelay = 100; // Delay between each character animation (adjust as needed)
  //   const chars = textObject.text.split(''); // Split text into individual characters
  //   let currentIndex = 0;

  //   // Function to animate each character individually
  //   const animateCharacters = () => {
  //     if (currentIndex < chars.length) {
  //       // Temporarily modify the Textbox content to show characters up to the current index
  //       const tempText = chars.slice(0, currentIndex + 1).join('');
  //       textObject.set({ text: tempText });

  //       // Animate opacity and shadow blur of the entire Textbox to simulate fade-in effect
  //       fabric.util.animate({
  //         startValue: { opacity: 0 },
  //         endValue: { opacity: 1 },
  //         duration: animationDuration,
  //         onChange: (value) => {
  //           // Update opacity and shadow blur of the Textbox
  //           textObject.set({ opacity: value.opacity });

  //           // Modify the shadow directly on the textObject
  //           textObject.shadow = `0px 0px ${20 * (1 - value.opacity)}px rgba(0,0,0,0.5)`;

  //           canvas.renderAll();
  //         },
  //         onComplete: () => {
  //           currentIndex++;
  //           setTimeout(animateCharacters, animationDelay); // Recursive call with delay
  //         },
  //         easing: fabric.util.ease.easeInOutCubic, // Easing function
  //       });
  //     }
  //   };

  //   // Start animation after a short delay to prevent blink
  //   setTimeout(animateCharacters, 100); // Adjust delay as needed
  // };


  // useEffect(() => {
  //   const canvasElement = canvasRef.current;
  //   const canvas = new fabric.Canvas(canvasElement, {
  //     width: 600,
  //     height: 400,
  //   });

  //   let newText = 'Your paragraph text';
  //   let textObject = new fabric.Text('', {  // Initialize with empty text
  //     left: 50,
  //     top: 50,
  //     fontSize: 30,
  //     lineHeight: 1.3,
  //     fontFamily: 'Arial',
  //     fill: 'blue',
  //     opacity: 0, // Start with opacity 0 for animation effect
  //     selectable: false,
  //     shadow: '0 0 0 rgba(0, 0, 0, 0.5)', // Initial shadow with 0 blur
  //   });

  //   canvas.add(textObject);

  //   const animateText = () => {
  //     let currentIndex = 0;
  //     const characters = newText.split('');
  //     const totalCharacters = characters.length;

  //     const animateCharacter = () => {
  //       if (currentIndex < totalCharacters) {
  //         const char = characters[currentIndex];
  //         textObject.text += char; // Append the current character to textObject
  //         canvas.renderAll();

  //         let step = 0;
  //         const fadeRate = 0.02;
  //         const maxBlur = 8;

  //         const animateFrame = () => {
  //           const progress = Math.min(1, step * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress); // Adjust blur level

  //           textObject.set({
  //             opacity: 1, // Ensure opacity is 1 during animation
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });

  //           canvas.renderAll();

  //           if (step < 1 / fadeRate) {
  //             step++;
  //             requestAnimationFrame(animateFrame);
  //           } else {
  //             currentIndex++;
  //             animateCharacter(); // Animate next character
  //           }
  //         };

  //         animateFrame();
  //       }
  //     };

  //     animateCharacter(); // Start animating characters
  //   };

  //   if (showAnimation) {
  //     animateText();
  //   } else {
  //     // If showAnimation is false, show the text immediately
  //     textObject.text = newText;
  //     textObject.set({
  //       opacity: 1,
  //       shadow: '0 0 0 rgba(0, 0, 0, 0.5)',
  //     });
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

  //   // Calculate text width using canvas context
  //   const ctx = canvas.getContext('2d');
  //   ctx.font = '30px Arial';
  //   const textWidth = ctx.measureText(newText).width;
  //   const textLeft = (canvas.width - textWidth) / 2; // Center text horizontally

  //   let textObject = new fabric.Text('', {
  //     left: textLeft,
  //     top: 50,
  //     fontSize: 30,
  //     lineHeight: 1.3,
  //     fontFamily: 'Arial',
  //     fill: 'blue',
  //     opacity: 0, // Initial opacity set to 0
  //     selectable: false,
  //     shadow: '0 0 0 rgba(0, 0, 0, 0.5)',
  //   });

  //   canvas.add(textObject);

  //   const animateText = () => {
  //     let currentIndex = 0;
  //     const characters = newText.split('');
  //     const totalCharacters = characters.length;
  //     let animatedText = ''; // Accumulate animated text here

  //     // Set initial state before animation starts
  //     textObject.set({
  //       opacity: 0, // Start with opacity 0
  //       shadow: '0 0 0 rgba(0, 0, 0, 0.5)',
  //     });

  //     const animateCharacter = () => {
  //       if (currentIndex < totalCharacters) {
  //         const char = characters[currentIndex];
  //         animatedText += char; // Accumulate characters

  //         textObject.set({
  //           text: animatedText,
  //         });

  //         canvas.renderAll();

  //         let step = 0;
  //         const fadeRate = 0.02;
  //         const maxBlur = 8;

  //         const animateFrame = () => {
  //           const progress = Math.min(1, step * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);

  //           textObject.set({
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });

  //           canvas.renderAll();

  //           if (progress < 1) {
  //             step++;
  //             requestAnimationFrame(animateFrame);
  //           } else {
  //             // Set final properties after animation completes
  //             textObject.set({
  //               opacity: 1,
  //               shadow: '0 0 0 rgba(0, 0, 0, 0.5)',
  //             });

  //             canvas.renderAll();

  //             currentIndex++;
  //             animateCharacter(); // Move to animate the next character
  //           }
  //         };

  //         animateFrame();
  //       }
  //     };

  //     animateCharacter();
  //   };

  //   if (showAnimation) {
  //     animateText();
  //   } else {
  //     textObject.text = newText;
  //     textObject.set({
  //       left: textLeft, // Ensure text is centered
  //       opacity: 1,
  //       shadow: '0 0 0 rgba(0, 0, 0, 0.5)',
  //     });
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

  //   const randomText = "Your paragraph text"; // Replace with your random text generation logic

  //   const ctx = canvas.getContext('2d');
  //   ctx.font = '30px Arial';
  //   const textWidth = ctx.measureText(randomText).width;

  //   const initialLeft = (canvas.width - textWidth) / 2;
  //   const textTop = 50;

  //   // Split the text into individual character Fabric.Text objects
  //   const chars = randomText.split('');
  //   const charObjects = chars.map((char, index) => {
  //     const charText = new fabric.Text(char, {
  //       left: initialLeft + ctx.measureText(randomText.slice(0, index)).width,
  //       top: textTop,
  //       fontSize: 30,
  //       fontFamily: 'Arial',
  //       fill: 'black',
  //       opacity: 0, // Initial opacity set to 0
  //       selectable: false,
  //       shadow: '0 0 20px rgba(0, 0, 0, 1)', // Initial shadow with high blur
  //     });
  //     canvas.add(charText);
  //     return charText;
  //   });

  //   const animateText = () => {
  //     const animationSteps = 40; // Number of animation frames for each character
  //     const fadeRate = 1 / animationSteps;
  //     const maxBlur = 20;

  //     charObjects.forEach((charObject, index) => {
  //       setTimeout(() => {
  //         let step = 0;

  //         const animateChar = () => {
  //           step++;

  //           const currentOpacity = step * fadeRate;
  //           const currentBlur = maxBlur * (1 - step / animationSteps);

  //           charObject.set({
  //             opacity: currentOpacity,
  //             shadow: `0 0 ${currentBlur}px rgba(0, 0, 0, ${currentOpacity})`,
  //           });

  //           canvas.renderAll();

  //           if (step < animationSteps) {
  //             requestAnimationFrame(animateChar);
  //           }
  //         };

  //         animateChar();
  //       }, index * 100); // Delay each character's animation by its index * 100 milliseconds
  //     });
  //   };

  //   if (showAnimation) {
  //     animateText();
  //   }

  //   return () => {
  //     canvas.dispose();
  //   };
  // }, [showAnimation]);



  // useEffect(() => {
  //   const canvasElement = canvasRef.current;
  //   const canvas = new fabric.Canvas(canvasElement, {
  //     width: 600,
  //     height: 400,
  //   });

  //   const randomText = "Your paragraph text"; // Replace with your random text generation logic

  //   const ctx = canvas.getContext('2d');
  //   ctx.font = '30px Arial';
  //   const textWidth = ctx.measureText(randomText).width;

  //   const initialLeft = (canvas.width - textWidth) / 2;
  //   const textTop = 50;

  //   // Split the text into individual character Fabric.Text objects
  //   const chars = randomText.split('');
  //   const charObjects = chars.map((char, index) => {
  //     const charText = new fabric.Text(char, {
  //       left: initialLeft + ctx.measureText(randomText.slice(0, index)).width,
  //       top: textTop,
  //       fontSize: 30,
  //       fontFamily: 'Arial',
  //       fill: 'black',
  //       opacity: 0, // Initial opacity set to 0
  //       selectable: false,
  //       shadow: '0 0 20px rgba(0, 0, 0, 1)', // Initial shadow with high blur
  //     });
  //     canvas.add(charText);
  //     console.log("charText",charText)
  //     return charText;
  //   });

  //   const animateText = () => {
  //     const animationSteps = 40; // Number of animation frames for each character
  //     const fadeRate = 1 / animationSteps;
  //     const maxBlur = 20;

  //     charObjects.forEach((charObject, index) => {
  //       setTimeout(() => {
  //         let step = 0;

  //         const animateChar = () => {
  //           step++;

  //           const currentOpacity = step * fadeRate;
  //           const currentBlur = maxBlur * (1 - step / animationSteps);

  //           charObject.set({
  //             opacity: currentOpacity,
  //             shadow: `0 0 ${currentBlur}px rgba(0, 0, 0, 1)`,
  //           });

  //           canvas.renderAll();

  //           if (step < animationSteps) {
  //             requestAnimationFrame(animateChar);
  //           }
  //         };

  //         animateChar();
  //       }, index * 100); // Delay each character's animation by its index * 100 milliseconds
  //     });
  //   };

  //   if (showAnimation) {
  //     animateText();
  //   }

  //   return () => {
  //     canvas.dispose();
  //   };
  // }, [showAnimation]);




  // useEffect(() => {
  //   const canvasElement = canvasRef.current;
  //   const canvas = new fabric.Canvas(canvasElement, {
  //     width: 600,
  //     height: 400,
  //   });

  //   const newText = 'Your paragraph text';
  //   const newTextObject = new fabric.Textbox(newText, {
  //     left: 50,
  //     top: 50,
  //     width: 500,
  //     fontSize: 30,
  //     lineHeight: 1.3,
  //     fontFamily: 'Arial',
  //     fill: 'blue',
  //     opacity: 0, // Initially hide text with opacity 0
  //   });

  //   canvas.add(newTextObject);
  //   canvas.renderAll(); // Render canvas initially

  //   const animateText = () => {
  //     const lines = newTextObject._textLines;
  //     if (!lines) {
  //       console.error('Text lines are not available.');
  //       return;
  //     }

  //     let animationProgress = 0;
  //     const totalChars = newText.length;
  //     const charOpacities = new Array(totalChars).fill(0);

  //     const animateFrame = () => {
  //       canvas.clear(); // Clear canvas for next frame

  //       const objectCenter = newTextObject.getCenterPoint();
  //       const initialLeft = objectCenter.x - newTextObject.width / 2;
  //       let yOffset = objectCenter.y - newTextObject.height / 2;

  //       for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
  //         let charLeft = initialLeft;
  //         const line = lines[lineIndex];
  //         if (lineIndex > 0) {
  //           yOffset += newTextObject.__lineHeights[lineIndex - 1] * newTextObject.lineHeight;
  //         }
  //         for (let charIndex = 0; charIndex < line.length; charIndex++) {
  //           const char = line[charIndex];
  //           const currentCharIndex = lines.slice(0, lineIndex).reduce((acc, line) => acc + line.length, 0) + charIndex;
  //           console.log("char", char)
  //           if (animationProgress >= currentCharIndex) {
  //             const progress = Math.min(1, (animationProgress - currentCharIndex) * 0.02); // Adjust animation speed if needed
  //             charOpacities[currentCharIndex] = progress;
  //           }

  //           const charOpacity = charOpacities[currentCharIndex];
  //           canvas.contextContainer.save();
  //           canvas.contextContainer.globalAlpha = charOpacity;
  //           canvas.contextContainer.fillStyle = newTextObject.fill;
  //           canvas.contextContainer.font = newTextObject._getFontDeclaration();
  //           canvas.contextContainer.fillText(char, charLeft, yOffset);
  //           canvas.contextContainer.restore();

  //           charLeft += canvas.contextContainer.measureText(char).width;
  //         }
  //       }

  //       canvas.renderAll(); // Render canvas with updated text

  //       if (animationProgress < totalChars + 50) { // Adjust animation end condition if needed
  //         animationProgress++;
  //         animationFrameId = requestAnimationFrame(animateFrame); // Continue animation
  //       }
  //     };

  //     animateFrame(); // Start animation loop
  //   };

  //   if (showAnimation) {
  //     animateText(); // Start animation if showAnimation is true
  //   } else {
  //     newTextObject.set({ opacity: 1 }); // Show text immediately without animation
  //     canvas.renderAll(); // Render canvas once
  //   }

  //   // Clean up
  //   return () => {
  //     cancelAnimationFrame(animationFrameId); // Cancel animation frame on component unmount
  //     if (canvas) {
  //       canvas.clear(); // Clear canvas
  //       canvas.dispose(); // Dispose fabric.Canvas instance
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
  //     opacity: 0, // Start with opacity 0 for fade-in effect
  //   });

  //   canvas.add(newTextObject);

  //   if (showAnimation) {
  //     newTextObject.animate('opacity', 1, {
  //       duration: 2000, // Animation duration in milliseconds
  //       onChange: canvas.renderAll.bind(canvas),
  //       easing: fabric.util.ease.easeOutCubic,
  //       onComplete: () => {
  //         animateChars(newTextObject);
  //       }
  //     });
  //   } else {
  //     newTextObject.set({ opacity: 1 });
  //     canvas.renderAll();
  //   }

  //   const animateChars = (textObject) => {
  //     const chars = textObject.text.split('');
  //     const fadeRate = 0.06;
  //     const maxBlur = 8;

  //     let step = 0;
  //     const fadeInOrder = Array.from({ length: chars.length }, (_, i) => i).sort(() => Math.random() - 0.5);

  //     const animateFrame = () => {
  //       fadeInOrder.forEach((charIndex, orderIndex) => {
  //         if (step >= orderIndex) {
  //           const char = chars[charIndex];
  //           const progress = Math.min(1, (step - orderIndex) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);

  //           textObject.setCharStyles(charIndex, charIndex + 1, {
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });
  //         }
  //       });

  //       canvas.renderAll();

  //       if (step < chars.length + 1 / fadeRate) {
  //         step++;
  //         requestAnimationFrame(animateFrame);
  //       } else {
  //         textObject.set({ opacity: 1 }); 
  //         canvas.renderAll();
  //       }
  //     };

  //     requestAnimationFrame(() => {
  //       animateFrame();
  //     });
  //   };

  //   return () => {
  //     canvas.dispose();
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
  //     opacity: 0, // Start with opacity 0 for fade-in effect
  //   });

  //   canvas.add(newTextObject);

  //   if (showAnimation) {
  //     newTextObject.animate('opacity', 1, {
  //       duration: 20000, // Fade-in duration in milliseconds
  //       onChange: canvas.renderAll.bind(canvas),
  //       easing: fabric.util.ease.easeOutCubic,
  //       onComplete: () => {
  //         animateChars(newTextObject);
  //       }
  //     });
  //   } else {
  //     newTextObject.set({ opacity: 1 });
  //     canvas.renderAll();
  //   }

  //   const animateChars = (textObject) => {
  //     const chars = textObject.text.split('');
  //     const fadeRate = 0.10; // Adjust fade rate for smoother animation
  //     const maxBlur = 20; // Adjust maximum blur level for more visible effect

  //     let step = 0;
  //     const fadeInOrder = Array.from({ length: chars.length }, (_, i) => i);

  //     const animateFrame = () => {
  //       fadeInOrder.forEach((charIndex) => {
  //         const progress = Math.min(1, step * fadeRate);
  //         const blurLevel = maxBlur * (1 - progress);

  //         textObject.setCharStyles(charIndex, charIndex + 1, {
  //           opacity: progress,
  //           shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //         });
  //       });

  //       canvas.renderAll();

  //       if (step < 1 / fadeRate) {
  //         step++;
  //         requestAnimationFrame(animateFrame);
  //       } else {
  //         textObject.set({ opacity: 1 }); // Ensure full opacity at the end
  //         canvas.renderAll();
  //       }
  //     };

  //     requestAnimationFrame(() => {
  //       animateFrame();
  //     });
  //   };

  //   return () => {
  //     canvas.dispose(); // Cleanup canvas on component unmount
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
  //     opacity: 0, // Start with opacity 0 for animation
  //   });

  //   canvas.add(newTextObject);
  //   console.log("newTextObject", newTextObject)
  //   if (showAnimation) {
  //     animateText(newTextObject, canvas);
  //   } else {
  //     newTextObject.set({ opacity: 1 }); // Show immediately if animation is disabled
  //     canvas.renderAll();
  //   }

  //   return () => {
  //     canvas.dispose(); // Dispose Fabric canvas properly
  //   };
  // }, [showAnimation]);

  // const animateText = (textObject, canvas) => {
  //   const maxBlur = 8;
  //   const fadeDuration = 1000; // milliseconds
  //   const fadeSteps = 60; // number of animation steps
  //   const fadeInOrder = Array.from({ length: textObject.text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  //   const charObjects = [];

  //   textObject.text.split('').forEach((char, index) => {
  //     const charObject = new fabric.Text(char, {
  //       left: textObject.left + textObject.width / 2,
  //       top: textObject.top + textObject.height / 2,
  //       fontSize: textObject.fontSize,
  //       fill: textObject.fill,
  //       fontFamily: textObject.fontFamily,
  //       opacity: 0,
  //       selectable: false,
  //       shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //       fontWeight: textObject.fontWeight,
  //     });

  //     charObjects.push(charObject);
  //     canvas.add(charObject);
  //     console.log("animation function", charObject)

  //     const delay = (index / textObject.text.length) * fadeDuration;
  //     fabric.util.animate({
  //       startValue: 0,
  //       endValue: 1,
  //       duration: fadeDuration,
  //       easing: fabric.util.ease.easeInOutCubic,
  //       onChange: (value) => {
  //         const blurLevel = maxBlur * (1 - value);
  //         charObject.set({
  //           opacity: value,
  //           shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //         });
  //         canvas.renderAll();
  //       },
  //       onComplete: () => {
  //         if (index === textObject.text.length - 1) {
  //           textObject.set({ opacity: 1 }); // Ensure opacity is set to 1 at the end
  //           canvas.renderAll();
  //         }
  //       },
  //       delay: delay,
  //     });
  //   });
  // };





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
  //       console.log("lines", lines,yOffset)
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
  //           console.log("")
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
  //         console.log("charObjects",charObjects)
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
    const newTextObject = new fabric.Textbox(newText, {
      left: 50,
      top: 50,
      width: 500,
      fontSize: 30,
      lineHeight: 1.3,
      fontFamily: 'Arial',
      fill: 'blue',
      opacity: 0, // Start with opacity 0 for animation effect
    });
  
    // Add the text object to the canvas
    canvas.add(newTextObject);
  
    // Ensure canvas is rendered after adding objects
    canvas.renderAll();
  
    const animateText = () => {
      const duration = 1000; // Animation duration in milliseconds
      const charCount = newText.length;
      const fadeRate = duration / charCount;
      const maxBlur = 8;
  
      let step = 0;
      const animateFrame = () => {
        const textObjects = newTextObject._objects;
        if (!textObjects) {
          console.warn('textObjects is not available yet. Waiting...');
          setTimeout(animateFrame, 100); // Retry after a short delay
          return;
        }
  
        console.log("textObjects", textObjects); // Log to track the state of textObjects
  
        if (step < charCount) {
          const char = newText.charAt(step);
          const charIndex = newTextObject.text.indexOf(char);
  
          if (charIndex !== -1) {
            const object = textObjects.find(obj => obj.type === 'text' && obj.lineIndex === 0 && obj.charIndex === charIndex);
  
            if (object) {
              const progress = (step + 1) / charCount;
              const blurLevel = maxBlur * (1 - progress);
              const opacity = progress;
  
              object.set('opacity', opacity);
              object.setShadow(`0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`);
  
              canvas.renderAll(); // Render canvas after modifying objects
  
              step++;
              setTimeout(animateFrame, fadeRate);
            }
          }
        } else {
          newTextObject.set('opacity', 1); // Ensure final opacity
          newTextObject._objects.forEach(obj => {
            if (obj.type === 'text') {
              obj.setShadow(null); // Clear shadow if needed
            }
          });
  
          canvas.renderAll(); // Final render after animation
        }
      };
  
      animateFrame(); // Start animation loop
    };
  
    // Trigger animation if showAnimation flag is true
    if (showAnimation) {
      animateText();
    } else {
      newTextObject.set('opacity', 1); // Ensure text is visible if animation is not triggered
      canvas.renderAll(); // Render canvas if animation is not needed
    }
  
    return () => {
      canvas.dispose(); // Clean up Fabric.js canvas instance
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
