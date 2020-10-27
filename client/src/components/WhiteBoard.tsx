import React, { useLayoutEffect, useEffect, useState } from 'react';
const io = require('socket.io-client');
const socket = io('http://localhost:3001');

const WhiteBoard = () => {
  let drawing = false;
  let lineWidth = 5;
  let lineCap = 'round';
  let color = 'blue';

  const draw = (x: number, y: number, lineWidth: number, lineCap: string, color: string, drawing: boolean) => {
    if (!drawing) return;
    const canvas : any = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(x - 8, y - 8);
    ctx.lineTo(x - 8, y - 8);
    ctx.stroke();
    ctx.closePath();
  }

  const emitDraws = (socket: any, x: number, y: number, lineWidth: number, lineCap: string, color: string) => {
    const data = {
      x,
      y,
      lineWidth,
      lineCap,
      color,
    };
    
    socket.emit('draw', data);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    drawing = true;
    draw(e.clientX, e.clientY, lineWidth, lineCap, color, drawing);
    emitDraws(socket, e.clientX, e.clientY, lineWidth, lineCap, color);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!drawing) return;
    draw(e.clientX, e.clientY, lineWidth, lineCap, color, drawing);
    emitDraws(socket, e.clientX, e.clientY, lineWidth, lineCap, color);
  };

  const handleMouseUp = () => {
    drawing = false;
  };

  socket.on('draw', ({ x, y, lineWidth, lineCap, color } : {x: number, y: number, lineWidth: number, lineCap: string, color: string}) => {
    draw(x, y, lineWidth, lineCap, color, true);
  });

  return (
    <canvas 
      id='canvas'
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      canvas
    </canvas>
  )
};

export default WhiteBoard;