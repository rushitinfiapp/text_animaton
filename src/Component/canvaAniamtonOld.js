import React, { Fragment, useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { initAligningGuidelines, initCenteringGuidelines } from './fabric-addon';

const DesignCanvas = ({ width = 600, height = 400, animationStyle, background = '#fff', showGrid: showGridProp = false, children }) => {
  const [canvas, setCanvas] = useState(null);
  const gridRef = useRef(null);
  const canvasRef = useRef(null);
  const [selectedObject, setSelectedObject] = useState(null);

  const renderGrid = () => {
    const gridCanvas = new fabric.Canvas(gridRef.current);
    const options = {
      distance: 10,
      param: {
        stroke: '#ebebeb',
        strokeWidth: 1,
        selectable: false,
      },
    };
    let gridLen = width / options.distance;

    for (let i = 0; i < gridLen; i++) {
      let distance = i * options.distance;
      let horizontal = new fabric.Line([distance, 0, distance, width], options.param);
      let vertical = new fabric.Line([0, distance, width, distance], options.param);
      gridCanvas.add(horizontal);
      gridCanvas.add(vertical);
      if (i % 5 === 0) {
        horizontal.set({ stroke: '#cccccc' });
        vertical.set({ stroke: '#cccccc' });
      }
    }
  };

  useEffect(() => {
    const mainCanvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: background,
      preserveObjectStacking: true,
    });

    initAligningGuidelines(fabric, mainCanvas);
    initCenteringGuidelines(fabric, mainCanvas);

    if (showGridProp) {
      renderGrid();
    }
    setCanvas(mainCanvas);

    mainCanvas.on('selection:created', (e) => {
      if (e.selected && e.selected.length > 0) {
        const selected = e.selected[0];
        if (selected.type === 'textbox' || selected.type === 'text') {
          setSelectedObject(selected);
        }
      }
    });

    mainCanvas.on('selection:updated', (e) => {
      if (e.selected && e.selected.length > 0) {
        const selected = e.selected[0];
        if (selected.type === 'textbox' || selected.type === 'text') {
          setSelectedObject(selected);
        }
      }
    });

    mainCanvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    return () => {
      mainCanvas.dispose();
    };
  }, [background, showGridProp]);

  const renderedChildren = React.Children.map(children, child => {
    return React.cloneElement(child, {
      canvas: canvas,
    });
  });

  // const clarifyAnimation = (textObject) => {
  //   const text = textObject.text;
  //   const fadeRate = 0.02;
  //   const maxBlur = 5;
  //   const moveDistance = 20;
  //   const textWidth = textObject.width;
  //   // const animationTypeSpeed = 50;
  //   // const startX = (canvas.width - textWidth) / 2; 
  //   const animationTypeSpeed = 15;
  //   const startX = 27; 
  //   const charPositions = [];

  //   console.log("startX",startX)
  //   for (let i = 0; i < text.length; i++) {
  //     charPositions.push({ x: startX, opacity: 1 });
  //   }

  //   const fadeInAni = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  //   let step = 0;

  //   const animate = () => {
  //     for (let i = 0; i < text.length; i++) {
  //       const charIndex = fadeInAni[i];
  //       const baseXPos = charPositions[charIndex].x;
  //       const xPosChar = baseXPos + moveDistance * (1 - charPositions[charIndex].opacity);

  //       if (step >= i) {
  //         charPositions[charIndex].opacity = Math.max(0, charPositions[charIndex].opacity - fadeRate);
  //         const blurLevel = maxBlur * (1 - charPositions[charIndex].opacity);
  //         textObject.set({
  //           left: xPosChar,
  //           opacity: charPositions[charIndex].opacity,
  //           shadow: {
  //             color: 'rgba(0, 0, 0, 0.5)',
  //             blur: blurLevel,
  //           },
  //         });
  //         textObject.setCoords();
  //       }
  //     }

  //     canvas.renderAll();

  //     if (step < text.length || charPositions.some(char => char.opacity > 0)) {
  //       step++;
  //       setTimeout(animate, animationTypeSpeed);
  //     }
  //   };

  //   animate();
  // };
  // const clarifyAnimation = () => {
  //   if (selectedObject && canvas) {
  //     const textObject = selectedObject;
  //     const text = textObject.text;
  //     const fadeRate = 0.02;
  //     const maxBlur = 5;
  //     const animationTypeSpeed = 30;

  //     // Create an array to hold individual character objects
  //     const charObjects = [];

  //     // Create individual fabric.Text objects for each character
  //     text.split('').forEach((char, index) => {
  //       const charObject = new fabric.Text(char, {
  //         left: textObject.left + index * (textObject.fontSize * 0.6),
  //         top: textObject.top,
  //         fontSize: textObject.fontSize,
  //         fill: textObject.fill,
  //         opacity: 0,
  //         shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //         selectable: false,
  //       });
  //       charObjects.push(charObject);
  //       canvas.add(charObject);
  //     });

  //     // Hide the original text object
  //     textObject.set({ opacity: 0 });
  //     canvas.renderAll();

  //     const randomOrder = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  //     let step = 0;

  //     const animate = () => {
  //       randomOrder.forEach((charIndex, index) => {
  //         if (step >= index) {
  //           const charObject = charObjects[charIndex];
  //           const progress = Math.min(1, (step - index) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);

  //           charObject.set({
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });
  //         }
  //       });

  //       canvas.renderAll();

  //       if (step < text.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       }
  //     };

  //     animate();
  //   }
  // };
  // const clarifyAnimation = () => {
  //   if (selectedObject && canvas) {
  //     const textObject = selectedObject;
  //     const text = textObject.text;
  //     const fadeRate = 0.02;
  //     const maxBlur = 5;
  //     const animationTypeSpeed = 30;

  //     // Create an array to hold individual character objects
  //     const charObjects = [];

  //     // Create individual fabric.Text objects for each character
  //     text.split('').forEach((char, index) => {
  //       const charObject = new fabric.Text(char, {
  //         left: textObject.left + index * (textObject.fontSize * 0.6),
  //         top: textObject.top,
  //         fontSize: textObject.fontSize,
  //         fill: textObject.fill,
  //         opacity: 0,
  //         shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //         selectable: false,
  //       });
  //       charObjects.push(charObject);
  //       canvas.add(charObject);
  //     });

  //     // Hide the original text object
  //     textObject.set({ opacity: 0 });
  //     canvas.renderAll();

  //     const randomOrder = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  //     let step = 0;

  //     const animate = () => {
  //       randomOrder.forEach((charIndex, index) => {
  //         if (step >= index) {
  //           const charObject = charObjects[charIndex];
  //           const progress = Math.min(1, (step - index) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);

  //           charObject.set({
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });
  //         }
  //       });

  //       canvas.renderAll();

  //       if (step < text.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       }
  //     };

  //     animate();
  //   }
  // };

  // const clarifyAnimation = () => {
  //   if (selectedObject && canvas) {
  //     const textObject = selectedObject;
  //     const text = textObject.text;
  //     const fadeRate = 0.02;
  //     const maxBlur = 5;
  //     const animationTypeSpeed = 30;
  //     const fadeDistance = 20; // Adjust the distance each character fades in

  //     // Create an array to hold individual character objects
  //     const charObjects = [];

  //     // Create individual fabric.Text objects for each character
  //     text.split('').forEach((char, index) => {
  //       const charObject = new fabric.Text(char, {
  //         left: textObject.left + index * (textObject.fontSize * 0.6) + fadeDistance, // Add fadeDistance to initial left position
  //         top: textObject.top,
  //         fontSize: textObject.fontSize,
  //         fill: textObject.fill,
  //         opacity: 0,
  //         shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //         selectable: false,
  //       });
  //       charObjects.push(charObject);
  //       canvas.add(charObject);
  //     });

  //     // Hide the original text object
  //     textObject.set({ opacity: 0 });
  //     canvas.renderAll();

  //     const randomOrder = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  //     let step = 0;

  //     const animate = () => {
  //       randomOrder.forEach((charIndex, index) => {
  //         if (step >= index) {
  //           const charObject = charObjects[charIndex];
  //           const progress = Math.min(1, (step - index) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);

  //           charObject.set({
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });
  //         }
  //       });

  //       canvas.renderAll();

  //       if (step < text.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       }
  //     };

  //     animate();
  //   }
  // };
  // const clarifyAnimation = () => {
  //   if (selectedObject && canvas) {
  //     const textObject = selectedObject;
  //     const text = textObject.text;
  //     const fadeRate = 0.02;
  //     const maxBlur = 5;
  //     const animationTypeSpeed = 30;
  //     const fadeDistance = 40; // Adjust the distance each character fades in

  //     // Create an array to hold individual character objects
  //     const charObjects = [];

  //     // Calculate total width of the text
  //     const totalWidth = textObject.width || (textObject.fontSize * 0.6 * text.length);

  //     // Calculate initial left position for the text
  //     const initialLeft = textObject.left - totalWidth / 2;

  //     // Create individual fabric.Text objects for each character
  //     text.split('').forEach((char, index) => {
  //       const charObject = new fabric.Text(char, {
  //         left: initialLeft + index * (textObject.fontSize * 0.6) + fadeDistance, // Adjust the left position calculation
  //         top: textObject.top,
  //         fontSize: textObject.fontSize,
  //         fill: textObject.fill,
  //         opacity: 0,
  //         shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //         selectable: false,
  //       });
  //       charObjects.push(charObject);
  //       canvas.add(charObject);
  //     });

  //     // Hide the original text object
  //     textObject.set({ opacity: 0 });
  //     canvas.renderAll();

  //     const randomOrder = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  //     let step = 0;

  //     const animate = () => {
  //       randomOrder.forEach((charIndex, index) => {
  //         if (step >= index) {
  //           const charObject = charObjects[charIndex];
  //           const progress = Math.min(1, (step - index) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);

  //           charObject.set({
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });
  //         }
  //       });

  //       canvas.renderAll();

  //       if (step < text.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       }
  //     };

  //     animate();
  //   }
  // };

  useEffect(() => {
    if (selectedObject && animationStyle?.clarifyAnimation === true) {
      clarifyAnimation();
    }
  }, [animationStyle, selectedObject])

  // const clarifyAnimation = () => {
  //   if (selectedObject && canvas) {
  //     const textObject = selectedObject;
  //     const text = textObject.text;
  //     const fadeRate = 0.02;
  //     const maxBlur = 10;
  //     const animationTypeSpeed = 60;
  //     const fadeDistance = 60; // Adjust the distance each character fades in

  //     // Create an array to hold individual character objects
  //     const charObjects = [];

  //     // Calculate total width of the text
  //     const totalWidth = textObject.width || (textObject.fontSize * 0.6 * text.length);

  //     // Calculate initial left position for the text
  //     // const initialLeft = textObject.left - totalWidth / 2;
  //     const initialLeft = textObject.left - totalWidth / 4;


  //     // Create individual fabric.Text objects for each character
  //     text.split('').forEach((char, index) => {
  //       const charObject = new fabric.Text(char, {
  //         left: initialLeft + index * (textObject.fontSize * 0.6) + fadeDistance, // Adjust the left position calculation
  //         top: textObject.top,
  //         fontSize: textObject.fontSize,
  //         fill: textObject.fill,
  //         opacity: 0, // Start with opacity 0
  //         shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //         selectable: false,
  //       });
  //       charObjects.push(charObject);
  //       canvas.add(charObject);
  //     });

  //     const randomOrder = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  //     let step = 0;

  //     const animate = () => {
  //       randomOrder.forEach((charIndex, index) => {
  //         if (step >= index) {
  //           const charObject = charObjects[charIndex];
  //           const progress = Math.min(1, (step - index) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);

  //           charObject.set({
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });
  //         }
  //       });

  //       canvas.renderAll();

  //       if (step < text.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       }
  //     };

  //     // Hide the original text object after animation starts
  //     setTimeout(() => {
  //       textObject.set({ opacity: 0 });
  //       canvas.renderAll();
  //       animate();
  //     }, animationTypeSpeed);
  //   }
  // };

  // const clarifyAnimation = () => {
  //   if (selectedObject && canvas) {
  //     const textObject = selectedObject;
  //     const text = textObject.text;
  //     const fadeRate = 0.02;
  //     const maxBlur = 10;
  //     const animationTypeSpeed = 60;
  //     const fadeDistance = 60;

  //     console.log("textObject", textObject)
  //     const charObjects = [];

  //     const totalWidth = textObject.width || (textObject.fontSize * 0.6 * text.length);

  //     const initialLeft = textObject.left - totalWidth / 4;
  //     text.split('').forEach((char, index) => {
  //       const charObject = new fabric.Text(char, {
  //         left: initialLeft + index * (textObject.fontSize * 0.6) + fadeDistance,
  //         top: textObject.top,
  //         fontSize: textObject.fontSize,
  //         fill: textObject.fill,
  //         opacity: 0,
  //         shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //         selectable: false,
  //       });
  //       charObjects.push(charObject);
  //       canvas.add(charObject);
  //     });

  //     const randomOrder = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  //     let step = 0;

  //     const animate = () => {
  //       randomOrder.forEach((charIndex, index) => {
  //         if (step >= index) {
  //           const charObject = charObjects[charIndex];
  //           const progress = Math.min(1, (step - index) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);

  //           charObject.set({
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });
  //         }
  //       });

  //       canvas.renderAll();

  //       if (step < text.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       }
  //     };

  //     setTimeout(() => {
  //       textObject.set({ opacity: 0 });
  //       canvas.renderAll();
  //       animate();
  //     }, animationTypeSpeed);
  //   }
  // };

  // const clarifyAnimation = () => {
  //   if (selectedObject && canvas) {
  //     const textObject = selectedObject;
  //     const text = textObject.text;
  //     const fadeRate = 0.02;
  //     const maxBlur = 10;
  //     const animationTypeSpeed = 60;
  //     const fadeDistance = 60;
  
  //     // Create an array to hold individual character objects
  //     const charObjects = [];
  
  //     // Calculate total width of the text
  //     const totalWidth = textObject.width || (textObject.fontSize * 0.6 * text.length);
  
  //     // Calculate initial left position for the text
  //     const initialLeft = textObject.left - totalWidth / 4;
  
  //     // Create individual fabric.Text objects for each character
  //     text.split('').forEach((char, index) => {
  //       const charObject = new fabric.Text(char, {
  //         left: initialLeft + index * (textObject.fontSize * 0.6) + fadeDistance,
  //         top: textObject.top,
  //         fontSize: textObject.fontSize,
  //         fill: textObject.fill,
  //         opacity: 0,
  //         shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //         selectable: false,
  //       });
  //       charObjects.push(charObject);
  //       canvas.add(charObject);
  //     });
  
  //     const randomOrder = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  //     let step = 0;
  
  //     const animate = () => {
  //       randomOrder.forEach((charIndex, index) => {
  //         if (step >= index) {
  //           const charObject = charObjects[charIndex];
  //           const progress = Math.min(1, (step - index) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);
  
  //           charObject.set({
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });
  //         }
  //       });
  
  //       canvas.renderAll();
  
  //       if (step < text.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       }
  //     };
  
  //     // Hide the original text object after animation starts
  //     setTimeout(() => {
  //       textObject.set({ opacity: 0 });
  //       canvas.renderAll();
  //       animate();
  //     }, animationTypeSpeed);
  //   }
  // };

  const clarifyAnimation = () => {
    if (selectedObject && canvas) {
      const textObject = selectedObject;
      const text = textObject.text;
      const fadeRate = 0.02;
      const maxBlur = 8;
      const animationTypeSpeed = 60;
      const fadeDistance = 20; // Adjust the distance each character moves during fade-in
      const charSpacing = 2; // Adjust the spacing between characters
  
      // Calculate the total width of the text
      const totalWidth = textObject.width || textObject.measureTextWidth();
  
      // Calculate the effective width of a character (including spacing)
      const charWidth = (totalWidth + (text.length - 1) * charSpacing) / text.length;
  
      // Calculate initial left position for the text
      // const initialLeft = textObject.left - totalWidth / 2;
      const initialLeft = 27;
  
      // Create an array to hold individual character objects
      const charObjects = [];
  
      // Create individual fabric.Text objects for each character
      text.split('').forEach((char, index) => {
        const charObject = new fabric.Text(char, {
          left: initialLeft + (charWidth + charSpacing) * index, // Distribute characters with spacing
          top: textObject.top,
          fontSize: textObject.fontSize,
          fill: textObject.fill,
          opacity: 0, // Start with opacity 0
          shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
          selectable: false,
          stroke: null, // Set stroke to null to remove it
          fontWeight: 'normal'
        });
        charObjects.push(charObject);
        canvas.add(charObject);
      });
  
      const randomOrder = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
      let step = 0;
  
      const animate = () => {
        randomOrder.forEach((charIndex, index) => {
          if (step >= index) {
            const charObject = charObjects[charIndex];
            const progress = Math.min(1, (step - index) * fadeRate);
            const blurLevel = maxBlur * (1 - progress);
            const initialX = initialLeft + (charWidth + charSpacing) * charIndex;
            const targetX = initialX + fadeDistance; // Adjust the position based on fade progress
  
            charObject.set({
              opacity: progress,
              shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
              left: initialX + (targetX - initialX) * progress,
            });
          }
        });
  
        canvas.renderAll();
  
        if (step < text.length + 1 / fadeRate) {
          step++;
          setTimeout(animate, animationTypeSpeed);
        }
      };
  
      // Hide the original text object after animation starts
      setTimeout(() => {
        textObject.set({ opacity: 0 });
        canvas.renderAll();
        animate();
      }, animationTypeSpeed);
    }
  };
  
  // const clarifyAnimation = () => {
  //   if (selectedObject && canvas) {
  //     const textObject = selectedObject;
  //     const text = textObject.text;
  //     const fadeRate = 0.02;
  //     const maxBlur = 20;
  //     const animationTypeSpeed = 50;
  //     const fadeDistance = 10; // Adjust the distance each character moves during fade-in
  //     const charSpacing = 2; // Adjust the spacing between characters
  
  //     // Calculate the total width of the text
  //     const totalWidth = textObject.width || textObject.measureTextWidth();
  
  //     // Calculate the effective width of a character (including spacing)
  //     const charWidth = (totalWidth + (text.length - 1) * charSpacing) / text.length;
  
  //     // Calculate initial left position for the text
  //     // const initialLeft = textObject.left - totalWidth / 2;
  //     const initialLeft = 27
  
  //     // Create an array to hold individual character objects
  //     const charObjects = [];
  
  //     // Create individual fabric.Text objects for each character
  //     text.split('').forEach((char, index) => {
  //       const charObject = new fabric.Text(char, {
  //         left: initialLeft + (charWidth + charSpacing) * index, // Distribute characters with spacing
  //         top: textObject.top,
  //         fontSize: textObject.fontSize,
  //         fill: textObject.fill,
  //         opacity: 0, // Start with opacity 0
  //         shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //         selectable: false,
  //         stroke: null, // Set stroke to null to remove it
  //         fontWeight: 'normal'
  //       });
  //       charObjects.push(charObject);
  //       canvas.add(charObject);
  //     });
  
  //     const centerIndex = Math.floor(text.length / 2); // Index of the center character
  //     const randomOrder = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  //     let step = 0;
  
  //     const animate = () => {
  //       randomOrder.forEach((charIndex, index) => {
  //         if (step >= index) {
  //           const charObject = charObjects[charIndex];
  //           const progress = Math.min(1, (step - index) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);
  //           const initialX = initialLeft + (charWidth + charSpacing) * charIndex;
  //           const targetX = initialX + fadeDistance; // Adjust the position based on fade progress
  
  //           charObject.set({
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //             left: initialX + (targetX - initialX) * progress,
  //           });
            
  //           if (charIndex === centerIndex) {
  //             // Increase blur for the center character
  //             charObject.set({ shadow: `0 0 ${maxBlur * 2}px rgba(0, 0, 0, 0.5)` });
  //           }
  //         }
  //       });
  
  //       canvas.renderAll();
  
  //       if (step < text.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       }
  //     };
  
  //     // Hide the original text object after animation starts
  //     setTimeout(() => {
  //       textObject.set({ opacity: 0 });
  //       canvas.renderAll();
  //       animate();
  //     }, animationTypeSpeed);
  //   }
  // };

  // const clarifyAnimation = () => {
  //   if (selectedObject && canvas) {
  //     const textObject = selectedObject;
  //     const text = textObject.text;
  //     const fadeRate = 0.02;
  //     const maxBlur = 10;
  //     const animationTypeSpeed = 60;
  //     const fadeDistance = 60;
  //     const charObjects = [];
  //     const totalWidth = textObject.width || (textObject.fontSize * 0.6 * text.length);
  //     const initialLeft = textObject.left - totalWidth / 4;

  //     text.split('').forEach((char, index) => {
  //       const charObject = new fabric.Text(char, {
  //         left: initialLeft + index * (textObject.fontSize * 0.6) + fadeDistance,
  //         top: textObject.top,
  //         fontSize: textObject.fontSize,
  //         fill: textObject.fill,
  //         opacity: 0,
  //         shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //         selectable: false,
  //       });
  //       charObjects.push(charObject);
  //       canvas.add(charObject);
  //     });

  //     const randomOrder = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  //     let step = 0;

  //     const animate = () => {
  //       randomOrder.forEach((charIndex, index) => {
  //         if (step >= index) {
  //           const charObject = charObjects[charIndex];
  //           const progress = Math.min(1, (step - index) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);

  //           charObject.set({
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });
  //         }
  //       });

  //       canvas.renderAll();

  //       if (step < text.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       }
  //     };

  //     setTimeout(() => {
  //       textObject.set({ opacity: 0 });
  //       canvas.renderAll();
  //       animate();
  //     }, animationTypeSpeed);
  //   }
  // };
  
  
  // const clarifyAnimation = () => {
  //   const text = selectedObject.text;
  //   const fadeRate = 0.02;
  //   const maxBlur = 10;
  //   const animationTypeSpeed = 60;
  //   const fadeDistance = 60;
  //   const charObjects = [];
  //   const totalWidth = selectedObject.width || (selectedObject.fontSize * 0.6 * text.length);
  //   const initialLeft = selectedObject.left - fadeDistance; // Adjust initial left position
  
  //   text.split('').forEach((char, index) => {
  //     const charObject = new fabric.Text(char, {
  //       left: initialLeft + index * (selectedObject.fontSize * 0.6), // Adjust left position here
  //       top: selectedObject.top,
  //       fontSize: selectedObject.fontSize,
  //       fill: selectedObject.fill,
  //       opacity: 0,
  //       shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //       selectable: false,
  //     });
  //     charObjects.push(charObject);
  //     canvas.add(charObject);
  //   });
  
  //   const randomOrder = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  //   let step = 0;
  
  //   const animate = () => {
  //     randomOrder.forEach((charIndex, index) => {
  //       if (step >= index) {
  //         const charObject = charObjects[charIndex];
  //         const progress = Math.min(1, (step - index) * fadeRate);
  //         const blurLevel = maxBlur * (1 - progress);
  
  //         charObject.set({
  //           opacity: progress,
  //           shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //         });
  //       }
  //     });
  
  //     canvas.renderAll();
  
  //     if (step < text.length + 1 / fadeRate) {
  //       step++;
  //       setTimeout(animate, animationTypeSpeed);
  //     }
  //   };
  
  //   setTimeout(() => {
  //     selectedObject.set({ opacity: 0 });
  //     canvas.renderAll();
  //     animate();
  //   }, animationTypeSpeed);
  // };
  
  
  
  
  
  
  

  const animateText = (canvas, textElement) => {
    console.log("Animating Text:", textElement.text);
    const text = textElement.text;
    const fadeRate = 0.02;
    const maxBlur = 5;
    const moveDistance = 20;
    const animationTypeSpeed = 50;
    const startY = textElement.top;
    const charPositions = [];

    for (let i = 0; i < text.length; i++) {
      charPositions.push({ x: 0, opacity: 0 });
    }

    const fadeInAni = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
    let step = 0;

    const animate = () => {
      for (let i = 0; i < text.length; i++) {
        const charIndex = fadeInAni[i];
        const baseXPos = charPositions[charIndex].x;
        const xPosChar = baseXPos + moveDistance * (1 - charPositions[charIndex].opacity);

        if (step >= i) {
          charPositions[charIndex].opacity = Math.min(1, charPositions[charIndex].opacity + fadeRate);
          const blurLevel = maxBlur * (1 - charPositions[charIndex].opacity);

          // Update text object properties
          textElement.set({
            left: xPosChar,
            opacity: charPositions[charIndex].opacity,
            shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
          });
          textElement.setCoords();
        }
      }

      canvas.requestRenderAll();

      if (step < text.length || charPositions.some(char => char.opacity < 1)) {
        step++;
        setTimeout(animate, animationTypeSpeed);
      }
    };

    animate();
  };

  return (
    <Fragment>
      {showGridProp && (
        <div style={{ position: 'absolute' }}>
          <canvas ref={gridRef} width={width} height={height} />
        </div>
      )}
      <div style={{ position: 'absolute' }}>
        <canvas ref={canvasRef} width={width} height={height} />
      </div>
      {canvas && renderedChildren}
      {/* <button
        style={{ position: 'absolute', top: 0, right: 0 }}
      onClick={e => {
        e.preventDefault();
        if (selectedObject) {
          clarifyAnimation();
        }
      }}
      >
        Clarify Animation
      </button> */}
      <button
        style={{ position: 'absolute', top: 30, right: 0 }}
        onClick={e => {
          e.preventDefault();
          console.log(canvas.toJSON());
        }}
      >
        Save To JSON
      </button>
    </Fragment>
  );
};

export default DesignCanvas;
