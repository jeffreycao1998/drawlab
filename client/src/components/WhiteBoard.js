import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const WhiteBoard = () => {

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = 'red';
    context.lineWidth  =5;
    contextRef.current = context;

    socket.on('drawing', data => {
      const { x, y} = data;

      contextRef.current.beginPath();
      contextRef.current.moveTo(x, y);
      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
      contextRef.current.closePath();
    });
  },[]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    emitDrawing(offsetX, offsetY);
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const emitDrawing = (offsetX, offsetY) => {
    const data = {
      x: offsetX,
      y: offsetY,
    }
    socket.emit('drawing', data);
  };

  return (
    <canvas 
      id='canvas'
      onMouseDown={startDrawing}
      onMouseUp={stopDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    >
      canvas
    </canvas>
  );
};

export default WhiteBoard;