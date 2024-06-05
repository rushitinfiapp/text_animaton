import React, { Fragment, useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { initAligningGuidelines, initCenteringGuidelines } from './fabric-addon';

const DesignCanvas = ({ width = 600, height = 400, animationStyle, setAnimationStyle,background = '#fff', showGrid: showGridProp = false, children }) => {
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
      // Remove event listeners when canvas is disposed
      mainCanvas.off('selection:created');
      mainCanvas.off('selection:updated');
      mainCanvas.off('selection:cleared');
    };
  }, [background, showGridProp]);

  const renderedChildren = React.Children.map(children, child => {
    return React.cloneElement(child, {
      canvas: canvas,
    });
  });

  useEffect(() => {
    if (selectedObject && animationStyle?.clarifyAnimation === true) {
      clarifyAnimation();
    }
  }, [animationStyle, selectedObject])

  // const clarifyAnimation = () => {
  //   if (selectedObject && canvas) {
  //     canvas.discardActiveObject(); // Clear selection
  //     const textObject = selectedObject;
  //     const text = textObject.text;
  //     const fadeRate = 0.02;
  //     const maxBlur = 8;
  //     const animationTypeSpeed = 60;
  //     const fadeDistance = 20; // Adjust the distance each character moves during fade-in
  //     const charSpacing = 2; // Adjust the spacing between characters

  //     // Calculate the total width of the text
  //     const totalWidth = textObject.width || textObject.measureTextWidth();

  //     // Calculate the effective width of a character (including spacing)
  //     const charWidth = (totalWidth + (text.length - 1) * charSpacing) / text.length;

  //     // Calculate initial left position for the text
  //     // const initialLeft = textObject.left - totalWidth / 2;
  //     const initialLeft = 27;

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
  //         }
  //       });

  //       canvas.renderAll();
  //       if (step < text.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       } else {
  //         textObject.set({ opacity: 1 }); // Restore original opacity
  //         canvas.remove(...charObjects); // Clear the characters from the canvas
  //         canvas.renderAll();
  //         // Update animation style
  //         setAnimationStyle({ clarifyAnimation: false });
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
  //     canvas.discardActiveObject(); // Clear selection
  //     const textObject = selectedObject;
  //     const text = textObject.text;
  //     const fadeRate = 0.02;
  //     const maxBlur = 8;
  //     const animationTypeSpeed = 60;
  //     const fadeDistance = 20; // Adjust the distance each character moves during fade-in
  //     const charSpacing = 2; // Adjust the spacing between characters
  
  //     // Calculate the total width of the text
  //     const totalWidth = textObject.width || textObject.measureTextWidth();
  
  //     // Calculate the effective width of a character (including spacing)
  //     const charWidth = (totalWidth + (text.length - 1) * charSpacing) / text.length;
  
  //     // Calculate initial left position for the text
  //     const initialLeft = textObject.left - totalWidth / 2;
  
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
  
  //     let step = 0;
  //     const fadeInOrder = Array.from({ length: text.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  
  //     const animate = () => {
  //       fadeInOrder.forEach((charIndex, orderIndex) => {
  //         if (step >= orderIndex) {
  //           const charObject = charObjects[charIndex];
  //           const progress = Math.min(1, (step - orderIndex) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);
  //           const initialX = initialLeft + (charWidth + charSpacing) * charIndex;
  //           const targetX = initialX + fadeDistance; // Adjust the position based on fade progress
  
  //           charObject.set({
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //             left: initialX + (targetX - initialX) * progress,
  //           });
  //         }
  //       });
  
  //       canvas.renderAll();
  
  //       if (step < text.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       } else {
  //         textObject.set({ opacity: 1 }); // Restore original opacity
  //         canvas.remove(...charObjects); // Clear the characters from the canvas
  //         canvas.renderAll();
  //         // Update animation style
  //         setAnimationStyle({ clarifyAnimation: false });
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
  //     canvas.discardActiveObject(); // Clear selection
  //     const textObject = selectedObject;
  //     const text = textObject.text;
  //     const fadeRate = 0.02;
  //     const maxBlur = 8;
  //     const animationTypeSpeed = 60;
  //     const fadeDistance = 0; // Set to 0 to avoid significant left to right movement
  //     const charSpacing = 2; // Adjust the spacing between characters
  
  //     // Get the wrapped lines of text
  //     const lines = textObject._textLines;
  
  //     // Create an array to hold individual character objects
  //     const charObjects = [];
  //     const lineHeight = textObject.fontSize * 1.2; // Assuming line height is 1.2 times the font size
  
  //     lines.forEach((line, lineIndex) => {
  //       // Measure the width of the current line
  //       const lineWidth = textObject.__lineWidths[lineIndex];
  //       const charWidth = (lineWidth + (line.length - 1) * charSpacing) / line.length;
  //       const initialLeft = textObject.left - lineWidth / 2;
  //       const yOffset = textObject.top + lineIndex * lineHeight;
  
  //       line.forEach((char, index) => {
  //         const charObject = new fabric.Text(char, {
  //           left: initialLeft + (charWidth + charSpacing) * index, // Distribute characters with spacing
  //           top: yOffset,
  //           fontSize: textObject.fontSize,
  //           fill: textObject.fill,
  //           opacity: 0, // Start with opacity 0
  //           shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //           selectable: false,
  //           stroke: null, // Set stroke to null to remove it
  //           fontWeight: 'normal'
  //         });
  //         charObjects.push(charObject);
  //         canvas.add(charObject);
  //       });
  //     });
  
  //     let step = 0;
  //     const fadeInOrder = Array.from({ length: charObjects.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  
  //     const animate = () => {
  //       fadeInOrder.forEach((charIndex, orderIndex) => {
  //         if (step >= orderIndex) {
  //           const charObject = charObjects[charIndex];
  //           const progress = Math.min(1, (step - orderIndex) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);
  
  //           charObject.set({
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //             left: charObject.left + fadeDistance * progress, // Adjust the position based on fade progress
  //           });
  //         }
  //       });
  
  //       canvas.renderAll();
  
  //       if (step < charObjects.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       } else {
  //         textObject.set({ opacity: 1 }); // Restore original opacity
  //         canvas.remove(...charObjects); // Clear the characters from the canvas
  //         canvas.renderAll();
  //         // Update animation style
  //         setAnimationStyle({ clarifyAnimation: false });
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
  //     canvas.discardActiveObject(); // Clear selection
  //     const textObject = selectedObject;
  //     const text = textObject.text;
  //     const fadeRate = 0.02;
  //     const maxBlur = 8;
  //     const animationTypeSpeed = 60;
  //     const charSpacing = 0; // Adjust the spacing between characters
  
  //     // Get the wrapped lines of text
  //     const lines = textObject._textLines;
  
  //     // Create an array to hold individual character objects
  //     const charObjects = [];
  //     const lineHeight = textObject.fontSize * 1.2; // Assuming line height is 1.2 times the font size
  
  //     // Store original properties
  //     const originalOpacity = textObject.opacity;
  //     const originalLeft = textObject.left + 100;
  //     const originalTop = textObject.top;
  
  //     lines.forEach((line, lineIndex) => {
  //       // Measure the width of the current line
  //       const lineWidth = textObject.__lineWidths[lineIndex];
  //       const charWidth = (lineWidth + (line.length - 1) * charSpacing) / line.length;
  //       const initialLeft = originalLeft - lineWidth / 2;
  //       const yOffset = originalTop + lineIndex * lineHeight;
  
  //       line.forEach((char, index) => {
  //         const charObject = new fabric.Text(char, {
  //           left: initialLeft + (charWidth + charSpacing) * index, // Distribute characters with spacing
  //           top: yOffset,
  //           fontSize: textObject.fontSize,
  //           fill: textObject.fill,
  //           fontFamily: 'Arial',
  //           opacity: 0, // Start with opacity 0
  //           // shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //           selectable: false,
  //           stroke: null, // Set stroke to null to remove it
  //           fontWeight: textObject?.fontWeight
  //         });
  //         charObjects.push(charObject);
  //         canvas.add(charObject);
  //       });
  //     });
  
  //     let step = 0;
  //     const fadeInOrder = Array.from({ length: charObjects.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  
  //     const animate = () => {
  //       fadeInOrder.forEach((charIndex, orderIndex) => {
  //         if (step >= orderIndex) {
  //           const charObject = charObjects[charIndex];
  //           const progress = Math.min(1, (step - orderIndex) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);
  
  //           charObject.set({
  //             opacity: progress,
  //             shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });
  //         }
  //       });
  
  //       canvas.renderAll();
  
  //       if (step < charObjects.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       } else {
  //         textObject.set({ opacity: originalOpacity }); // Restore original opacity
  //         canvas.remove(...charObjects); // Clear the characters from the canvas
  //         canvas.renderAll();
  //         // Update animation style
  //         setAnimationStyle({ clarifyAnimation: false });
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
  //     canvas.discardActiveObject(); // Clear selection
  //     const textObject = selectedObject;
  //     const text = textObject.text;
  //     const fadeRate = 0.02;
  //     const maxBlur = 8;
  //     const animationTypeSpeed = 60;
  //     const charSpacing = 0; // Adjust the spacing between characters
  
  //     // Get the wrapped lines of text
  //     const lines = textObject._textLines;
  
  //     // Create an array to hold individual character objects
  //     const charObjects = [];
  //     const lineHeight = textObject.fontSize * 1.2; // Assuming line height is 1.2 times the font size
  
  //     // Store original properties
  //     const originalOpacity = textObject.opacity;
  //     const originalLeft = textObject.left + 100;
  //     const originalTop = textObject.top;
  
  //     lines.forEach((line, lineIndex) => {
  //       // Measure the width of the current line
  //       const lineWidth = textObject.__lineWidths[lineIndex];
  //       const charWidth = (lineWidth + (line.length - 1) * charSpacing) / line.length;
  //       const initialLeft = originalLeft - lineWidth / 2;
  //       const yOffset = originalTop + lineIndex * lineHeight;
      
  //       // Split the line into individual characters
  //       [...line].forEach((char, index) => {
  //         const charObject = new fabric.Text(char, {
  //           left: initialLeft + (charWidth + charSpacing) * index, // Distribute characters with spacing
  //           top: yOffset,
  //           fontSize: textObject.fontSize,
  //           fill: textObject.fill,
  //           fontFamily: 'Arial',
  //           opacity: 0, // Start with opacity 0
  //           // shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
  //           selectable: false,
  //           stroke: null, // Set stroke to null to remove it
  //           fontWeight: textObject?.fontWeight
  //         });
  //         charObjects.push(charObject);
  //         canvas.add(charObject);
  //       });
  //     });
      
  
  //     let step = 0;
  //     const fadeInOrder = Array.from({ length: charObjects.length }, (_, i) => i).sort(() => Math.random() - 0.5);
  
  //     const animate = () => {
  //       fadeInOrder.forEach((charIndex, orderIndex) => {
  //         if (step >= orderIndex) {
  //           const charObject = charObjects[charIndex];
  //           const progress = Math.min(1, (step - orderIndex) * fadeRate);
  //           const blurLevel = maxBlur * (1 - progress);
  
  //           charObject.set({
  //             opacity: progress,
  //             // shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
  //           });
  //         }
  //       });
  
  //       canvas.renderAll();
  
  //       if (step < charObjects.length + 1 / fadeRate) {
  //         step++;
  //         setTimeout(animate, animationTypeSpeed);
  //       } else {
  //         textObject.set({ opacity: originalOpacity }); // Restore original opacity
  //         canvas.remove(...charObjects); // Clear the characters from the canvas
  //         canvas.renderAll();
  //         // Update animation style
  //         setAnimationStyle({ clarifyAnimation: false });
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
      canvas.discardActiveObject(); // Clear selection
      const textObject = selectedObject;
      const text = textObject.text;
      const fadeRate = 0.02;
      const maxBlur = 8;
      const animationTypeSpeed = 60;
      const charSpacing = 0; // Adjust the spacing between characters
    
      // Get the wrapped lines of text
      const lines = textObject._textLines;
    
      // Create an array to hold individual character objects
      const charObjects = [];
      const lineHeight = textObject.fontSize * 1.2; // Assuming line height is 1.2 times the font size
    
      // Store original properties
      const originalOpacity = textObject.opacity;
      const originalLeft = textObject.left + 100;
      const originalTop = textObject.top;
    
      lines.forEach((line, lineIndex) => {
        // Measure the width of the current line
        const lineWidth = textObject.__lineWidths[lineIndex];
        const charWidth = (lineWidth + (line.length - 1) * charSpacing) / line.length;
        const initialLeft = originalLeft - lineWidth / 2;
        const yOffset = originalTop + lineIndex * lineHeight;
    
        // Split the line into individual characters, including spaces
        let charIndex = 0;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char !== ' ') {
            const charObject = new fabric.Text(char, {
              left: initialLeft + (charWidth + charSpacing) * charIndex, // Distribute characters with spacing
              top: yOffset,
              fontSize: textObject.fontSize,
              fill: textObject.fill,
              fontFamily: 'Arial',
              opacity: 0, // Start with opacity 0
              // shadow: `0 0 ${maxBlur}px rgba(0, 0, 0, 0.5)`,
              selectable: false,
              stroke: null, // Set stroke to null to remove it
              fontWeight: textObject?.fontWeight
            });
            charObjects.push(charObject);
            canvas.add(charObject);
            charIndex++;
          } else {
            charIndex++; // Increment index for the space character
          }
        }
      });
    
      let step = 0;
      const fadeInOrder = Array.from({ length: charObjects.length }, (_, i) => i).sort(() => Math.random() - 0.5);
      const animate = () => {
        fadeInOrder.forEach((charIndex, orderIndex) => {
          if (step >= orderIndex) {
            const charObject = charObjects[charIndex];
            const progress = Math.min(1, (step - orderIndex) * fadeRate);
            const blurLevel = maxBlur * (1 - progress);
            const text = charObject.text.trim(); // Remove extra spaces
      
            charObject.set({
              text: text, // Set the text without extra spaces
              opacity: progress,
              // shadow: `0 0 ${blurLevel}px rgba(0, 0, 0, 0.5)`,
            });
          }
        });
      
        canvas.renderAll();
      
        if (step < charObjects.length + 1 / fadeRate) {
          step++;
          setTimeout(animate, animationTypeSpeed);
        } else {
          textObject.set({ opacity: originalOpacity }); // Restore original opacity
          canvas.remove(...charObjects); // Clear the characters from the canvas
          canvas.renderAll();
          // Update animation style
          setAnimationStyle({ clarifyAnimation: false });
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
