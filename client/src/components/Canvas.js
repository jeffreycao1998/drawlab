import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import socket from '../socket';

const CanvasContainer = styled.div`
  grid-area: canvas;
  background-color: #8e44ad;
  display: flex;
  justify-content: center;
  align-items: center;

  #canvas {
    background-color: white;
  }
`;

const Canvas = () => {
  const [ offsetPosition, setOffsetPosition ] = useState([]);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  let isDrawing = false;
  let prevX = null;
  let prevY = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    console.log(canvas.getBoundingClientRect());
    // console.log({offsetX: canvas.position().left, offsetY: canvas.position().top });
    // setOffsetPosition({offsetX: canvas.position.left, offsetY: canvas.position.top });

    canvas.width = 500;
    canvas.height = 500;

    const ctx = canvas.getContext('2d');
    // ctx.scale(2, 2);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctxRef.current = ctx;

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
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(prevX, prevY);
    ctxRef.current.lineTo(currX, currY);
    ctxRef.current.stroke();
    ctxRef.current.closePath();
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
    <CanvasContainer>
      <canvas
        id='canvas'
        onMouseDown={startDrawing}
        onMouseMove={emitDrawing}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        ref={canvasRef}
      >
      </canvas>
    </CanvasContainer>
  );
};

export default Canvas;