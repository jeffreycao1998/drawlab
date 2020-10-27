import React, { useLayoutEffect, useEffect, useState } from 'react';

const WhiteBoard = ({ socket } : { socket: any }) => {
  let ctx: any;
  let drawing = false;

  useLayoutEffect(() => {
    const canvas : any = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
  });

  const draw = (e: React.MouseEvent) => {
    if (!drawing) return;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue';
    ctx.lineTo(e.clientX - 8, e.clientY - 8);
    ctx.stroke();
    ctx.moveTo(e.clientX - 8, e.clientY - 8);

    socket.emit('draw', {
      x: e.clientX,
      y: e.clientY,
      lineWidth: 10,
      lineCap: 'round',
      color: 'blue',
      room: 100,
      socketId: socket.id,
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    drawing = true;
    draw(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!drawing) return;
    draw(e);
  };

  const handleMouseUp = () => {
    drawing = false;
    ctx.beginPath();
  };

  if (socket.id) {
    console.log('ran');
    socket.on('draw', (data: any) => {
      console.log(data);
    });
  }

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