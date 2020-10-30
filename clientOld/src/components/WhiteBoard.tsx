import React, { useLayoutEffect, useEffect, useState } from 'react';
const io = require('socket.io-client');
const socket = io('http://localhost:3001');

const WhiteBoard = () => {
  let drawing = false;
  let lineWidth = 5;
  let lineCap = 'round';
  let color = 'blue';
  let canvas: any;
  let ctx: any;

  const throttle = (fn: any, delay: number) => {
    let last = 0;
    return (...args: any) => {
      const now = new Date().getTime();
      if (now - last < delay) {
        return;
      }
      last = now;
      return fn(...args);
    }
  }

  useLayoutEffect(() => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', throttle((e: any) => {
      handleMouseMove(e);
    },5));
    // canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
  });

  const coords: any[] = [];

  const draw = (x: number, y: number, lineWidth: number, lineCap: string, color: string, drawing: boolean, emit: boolean) => {
    if (!drawing || !ctx) return;
    console.log(x, y);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;
    ctx.strokeStyle = color;

    ctx.lineTo(x - 8, y - 8);
    ctx.stroke();
    ctx.moveTo(x - 8, y - 8);

    if (emit) {
      coords.push([x, y]);
      const data = {
        x,
        y,
        lineWidth,
        lineCap,
        color,
      };
      socket.emit('draw', data);
    }
  }

  // const emitDraws = (socket: any, x: number, y: number, lineWidth: number, lineCap: string, color: string) => {
  //   const data = {
  //     x,
  //     y,
  //     lineWidth,
  //     lineCap,
  //     color,
  //   };
  //   socket.emit('draw', data);
  // };

  const handleMouseDown = (e: React.MouseEvent) => {
    drawing = true;
    draw(e.clientX, e.clientY, lineWidth, lineCap, color, drawing, true);
    // emitDraws(socket, e.clientX, e.clientY, lineWidth, lineCap, color);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!drawing) return;
    draw(e.clientX, e.clientY, lineWidth, lineCap, color, drawing, true);
    // emitDraws(socket, e.clientX, e.clientY, lineWidth, lineCap, color);
  };

  const handleMouseUp = () => {
    drawing = false;
    if (!ctx) return;
    ctx.beginPath();
    console.log(coords);
  };

  socket.on('draw', ({ x, y, lineWidth, lineCap, color } : {x: number, y: number, lineWidth: number, lineCap: string, color: string}) => {
    draw(x, y, lineWidth, lineCap, color, true, false);
    if (ctx) ctx.beginPath();
  });

  return (
    <canvas 
      id='canvas'
      width={window.innerWidth}
      height={window.innerHeight}
      // onMouseDown={handleMouseDown}
      // onMouseMove={handleMouseMove}
      // onMouseUp={handleMouseUp}
    >
      canvas
    </canvas>
  )
};

export default WhiteBoard;