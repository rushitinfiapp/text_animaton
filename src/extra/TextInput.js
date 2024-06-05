import React, { useEffect } from 'react';
import { fabric } from 'fabric';

const Text = ({ canvas, model }) => {
  useEffect(() => {
    const { width, fontFamily,textAlign, text, fontSize, x, y } = model;
    const textbox = new fabric.Textbox(text, {
      width,
      fontSize,
      fontFamily,
      textAlign,
      left: x,
      top: y,
    });
    canvas.add(textbox);

    return () => {
      canvas.remove(textbox);
    };
  }, [canvas, model]);

  return null;
};

export default Text;
