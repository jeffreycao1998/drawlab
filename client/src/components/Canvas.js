import React, { useEffect, useRef } from 'react';
import socket from '../socket';

const Canvas = () => {

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  let isDrawing = false;
  let prevX = null;
  let prevY = null;

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.height = `1920px`;
    canvas.style.height = `1080px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = 'red';
    context.lineWidth = 5;
    contextRef.current = context;

    socket.on('drawing', data => {
      draw(data);
    });
  },[]);

  const startDrawing = (e) => {
    isDrawing = true;
    emitDrawing(e);
    prevX = e.clientX;
    prevY = e.clientY;
  };

  const draw = ({ prevX, prevY, currX, currY }) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(prevX, prevY);
    contextRef.current.lineTo(currX, currY);
    contextRef.current.stroke();
    contextRef.current.closePath();
  };

  const stopDrawing = () => {
    isDrawing = false;
    prevX = null;
    prevY = null;
  };

  const emitDrawing = (e) => {
    if (!isDrawing) return;

    const { clientX: currX, clientY: currY } = e;
    let data;

    if (prevX && prevY) {
      data = {
        prevX,
        prevY,
        currX,
        currY,
      };

      prevX = currX;
      prevY = currY;
    } else {
      prevX = currX;
      prevY = currY;

      data = {
        prevX,
        prevY,
        currX,
        currY,
      };
    }
    draw(data);
    socket.emit('drawing', data);
  };

  return (
    <canvas 
      id='canvas'
      onMouseDown={startDrawing}
      onMouseMove={emitDrawing}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      ref={canvasRef}
    />
  );
};

export default Canvas;