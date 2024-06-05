import React, { useEffect } from 'react';
import { fabric } from 'fabric';

const Image = ({ canvas, url, scale = 1.0, top = 0, left = 0, width, height }) => {
  useEffect(() => {
    // const options = omit({ top, left, width, height });

    // fabric.Image.fromURL(
    //   url,
    //   img => {
    //     const { width: imgWidth, height: imgHeight } = img._element;
    //     img.scale(scale);
    //     img.set({
    //       cropX: (imgWidth - width) / 2,
    //       cropY: (imgHeight - height) / 2,
    //     });
    //     canvas.add(img);
    //   },
    //   options
    // );
  }, [canvas, url, scale, top, left, width, height]);

  return null;
};

export default Image;
