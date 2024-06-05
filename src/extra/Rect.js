import React, { useEffect } from 'react';
import { fabric } from 'fabric';

const Rect = ({ canvas, top = 0, left = 0, width = 50, height = 50, fill = 'red' }) => {
  useEffect(() => {
    const rect = new fabric.Rect({
      top,
      left,
      width,
      height,
      fill,
    });
    canvas.add(rect);

    return () => {
      canvas.remove(rect);
    };
  }, [canvas, top, left, width, height, fill]);

  return null;
};

export default Rect;
