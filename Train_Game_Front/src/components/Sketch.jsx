import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import { useSocket } from '../SocketContext';

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
  let falling = false;
  let win = false;
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('moved', (newX) => {
      console.log('Received new X position:', newX);
      x = newX;
      console.log('New X position:', x);
    });
    return () => {
      socket.off('moved');
    };
  }, [socket]);



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

        p.stroke(111);
        p.strokeWeight(2);
        p.strokeCap(p.SQUARE);
        p.drawingContext.setLineDash([20, 20]);
        p.line(0, y + 10, edgeTrain, y + 10);

        p.drawingContext.setLineDash([20, 0]);
        let trainLight = x + 200;
        p.line(x + pointSize, y, trainLight, y - pointSize * 0.8);
        p.line(x + pointSize, y, trainLight, y - pointSize * 1.4);
        p.line(x + pointSize, y, trainLight, y - pointSize * 2);
        p.line(x + pointSize, y, trainLight, y - pointSize * 2.6);
        p.line(x + pointSize, y, trainLight, y - pointSize * 3.2);

        if (x >= 980 && edgeTrain === 1000) {
          falling = true;
        }

        if (falling) {
          y2 += moveAmount * 0.3;
          p.background(0);
          p.fill(111);
          p.textSize(50);
          p.text('Game Overrrr', sketchW / 2 - 100, sketchH / 2);
        } if (win) {
          p.background(0);
          p.fill(111);
          p.textSize(50);
          p.text('Both OF The Players Win', sketchW / 2.5 - 100, sketchH / 2);
        }

        if (y > sketchH) {
          x = (sketchW / 2) - (pointSize / 2);
          y = (sketchH / 2) - (pointSize / 2);
          falling = false;
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
      if (event.key === 'ArrowRight') {
        const newX = Math.min(x + moveAmount, sketchW - pointSize);
        if (newX == sketchW - pointSize) {
          win = true;
          if (socket) socket.emit('win');
        }
        if (socket) {
          socket.emit('move', newX);
        }
        x = newX;
      } else if (event.key === 'ArrowUp' && edgeTrain < 1200) {
        edgeTrain += 200;
      } else if (event.key === 'ArrowDown' && edgeTrain > 1000) {
        edgeTrain -= 200;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [x, y, socket]);

  return <div className='sketch' ref={sketchRef}></div>;
};

export default Sketch;
