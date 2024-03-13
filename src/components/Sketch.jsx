import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const Sketch = () => {
  const sketchH = 600;
  const sketchW = 600;
  const pointSize = 20;
  const moveAmount = 10;

  const sketchRef = useRef();
  let canvas;
  let x = (sketchW / 2) - (pointSize / 2);
  let y = (sketchH / 2) - (pointSize / 2);

  useEffect(() => {
    const sketch = new p5((p) => {
      p.setup = () => {
        canvas = p.createCanvas(sketchH, sketchW);
      };

      p.draw = () => {
        p.background(100);
        p.ellipse(x, y, pointSize, pointSize);
      };
    }, sketchRef.current);

    return () => {
      sketch.remove();
      canvas.remove();
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowUp') {
        y = Math.max(y - moveAmount, 0);
      } else if (event.key === 'ArrowDown') {
        y = Math.min(y + moveAmount, sketchH - pointSize);
      } else if (event.key === 'ArrowLeft') {
        x = Math.max(x - moveAmount, 0);
      } else if (event.key === 'ArrowRight') {
        x = Math.min(x + moveAmount, sketchW - pointSize);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [x, y]);

  return <div className='sketch' ref={sketchRef}></div>;
};

export default Sketch;
