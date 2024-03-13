import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';

const Sketch = () => {
  const sketchH = 600;
  const sketchW = 1200;
  const pointSize = 20;
  const moveAmount = 10;

  const sketchRef = useRef();
  let canvas;
  let x = (sketchW / 2) - (pointSize / 2);
  let y = (sketchH / 2) - (pointSize / 2);
  let y2 = (sketchH / 2) - (pointSize / 2);
  let edgeTrain = sketchW - 200;
  console.log("edge ", edgeTrain)
  // const [falling, setFalling] = useState(false);
  var falling = false;

  useEffect(() => {
    const sketch = new p5((p) => {
      p.setup = () => {
        canvas = p.createCanvas(sketchW, sketchH).style('border', '1px solid #fff');
      };

      p.draw = () => {
        p.background(0);
        p.rect(x, y2 - pointSize / 2, pointSize, pointSize);
        p.rect(x - pointSize - 20, y2 - pointSize / 2, pointSize, pointSize);
        p.rect(x - pointSize * 2 - 40, y2 - pointSize / 2, pointSize, pointSize);
        p.rect(x - pointSize * 3 - 60, y2 - pointSize / 2, pointSize, pointSize);
        p.rect(x - pointSize * 4 - 80, y2 - pointSize / 2, pointSize, pointSize);
        p.rect(x - pointSize * 5 - 100, y2 - pointSize / 2, pointSize, pointSize);
        p.rect(x - pointSize * 6 - 120, y2 - pointSize / 2, pointSize, pointSize);
        p.rect(x - pointSize * 7 - 140, y2 - pointSize / 2, pointSize, pointSize);
        pointSize
        // Draw dashed line after the point
        p.stroke(111);
        p.strokeWeight(2);
        p.strokeCap(p.SQUARE);
        p.drawingContext.setLineDash([20, 20]); // set line dash pattern
        p.line(0, y + 10, edgeTrain, y + 10);
        
        p.drawingContext.setLineDash([20, 0]); // set line dash pattern
        p.line(x + pointSize / 2, y - 10, sketchW, y - pointSize * 2);
        p.line(x + pointSize / 2, y - 10, sketchW, y - pointSize * 2.5);
        p.line(x + pointSize / 2, y - 10, sketchW, y - pointSize * 3);
        p.line(x + pointSize / 2, y - 10, sketchW, y - pointSize * 3.5);
        p.line(x + pointSize / 2, y - 10, sketchW, y - pointSize * 4);

        // x =980 fall 
        if (x >= 980 && edgeTrain === 1000) {
          falling = true;
        }

        if (falling) {
          y2 += moveAmount * 0.3;
          p.background(0);

          // text color
          p.fill(111);
          p.textSize(50);
          p.text('Game Over', sketchW / 2 - 100, sketchH / 2);
        }

        if (y > sketchH) {
          x = (sketchW / 2) - (pointSize / 2);
          y = (sketchH / 2) - (pointSize / 2);
          setFalling(false);
        }
      };
    }, sketchRef.current);

    return () => {
      sketch.remove();
      canvas.remove();
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        x = Math.max(x - moveAmount, pointSize / 2);
      } else if (event.key === 'ArrowRight') {
        x = Math.min(x + moveAmount, sketchW - pointSize / 2);
      } else if (event.key === 'ArrowUp') {
        edgeTrain += 200;
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
