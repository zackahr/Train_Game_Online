import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import { useSocket } from '../SocketContext';
import TrainImage from '../assets/Trains/Train.png';
import TrainFlatBed from '../assets/Trains/TrailFlatbed01.png'
import TrainFlatBed2 from '../assets/Trains/TrailFlatbed02.png'
import TrainFlatBed3 from '../assets/Trains/TrailFlatbed03.png'
import BackgroundImage from '../assets/Trains/background2.jpg';
import { useNavigate } from 'react-router-dom';

const Sketch = () => {
  const sketchH = 400;
  const sketchW = 1200;
  const pointSize = 20;
  const trainSize = 40;
  const moveAmount = 10;

  const sketchRef = useRef();
  let canvas;
  let x = 100;
  let y = (sketchH / 2) - (pointSize / 2);
  let y2 = (sketchH / 2) - (pointSize / 2);
  let edgeTrain = sketchW - 200;
  let falling = false;
  let win = false;
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    socket.on('moved', (newX) => {
      x = newX;
    });
    
    socket.on('opponentDisconnected', () => {
      falling = true;
    });

    socket.on('win', () => {
      win = true;
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    });

    socket.on('movedEdge', (newEdge) => {
      edgeTrain = newEdge;
      console.log('edgeTrain', edgeTrain);
    });
    return () => {
      socket.off('moved');
    };
  }, [socket]);

  let img = '';
  let flat = '';
  let flat2 = '';
  let flat3 = '';
  let bgImage = '';
  useEffect(() => {
    const sketch = new p5((p) => {
      p.setup = () => {
        bgImage = p.loadImage(BackgroundImage);
        canvas = p.createCanvas(sketchW, sketchH).parent(sketchRef.current).style('border', '1px solid #fff');
        sketchRef.current.style.display = 'flex';
        sketchRef.current.style.justifyContent = 'center';
        sketchRef.current.style.alignItems = 'center';
      };

      p.preload = () => {
        img = p.loadImage(TrainImage);
        flat = p.loadImage(TrainFlatBed);
        flat2 = p.loadImage(TrainFlatBed2);
        flat3 = p.loadImage(TrainFlatBed3);
      };

      p.draw = () => {
        p.image(bgImage, 0, 0, sketchW, sketchH);
        p.image(img, x, y2 * 1.63, trainSize + 10, trainSize);
        p.image(flat, x - trainSize * 1.5, y2 * 1.74, trainSize + 10, trainSize / 2);
        p.image(flat2, x - trainSize * 3, y2 * 1.74, trainSize + 10, trainSize / 2);
        p.image(flat3, x - trainSize * 4.5, y2 * 1.74, trainSize + 10, trainSize / 2);
        p.image(flat, x - trainSize * 6, y2 * 1.74, trainSize + 10, trainSize / 2);
        p.image(flat2, x - trainSize * 7.5, y2 * 1.74, trainSize + 10, trainSize / 2);
        p.image(flat3, x - trainSize * 9, y2 * 1.74, trainSize + 10, trainSize / 2);


        p.stroke(0);
        p.strokeWeight(2);
        p.strokeCap(p.SQUARE);
        p.drawingContext.setLineDash([20, 20]);
        p.line(0, y + 160, edgeTrain, y + 160);

        p.drawingContext.setLineDash([20, 0]);

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
        const move = x;
        const endpoint = sketchW - trainSize;
        const data = { move, endpoint };
        if (socket) {
          socket.emit('move', data);
        }
      }
      else if (event.key === 'ArrowUp' && edgeTrain < 1200) {
        if (socket) {
          socket.emit('moveEdge', edgeTrain);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [x, y, socket]);

  return <div className='sketch' ref={sketchRef} style={{ width: '100vw', height: '100vh' }}></div>;
};

export default Sketch;
