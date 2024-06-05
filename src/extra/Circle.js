import React, { useEffect } from 'react';
import { fabric } from 'fabric';

const Circle = ({ canvas, top = 0, left = 0, radius = 25, fill = 'red' }) => {
  useEffect(() => {
    const circle = new fabric.Circle({
      top,
      left,
      radius,
      fill,
    });
    canvas.add(circle);

    return () => {
      canvas.remove(circle);
    };
  }, [canvas, top, left, radius, fill]);

  return null;
};

export default Circle;
