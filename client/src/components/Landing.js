import React from 'react';
import styled from 'styled-components';
import socket from '../socket';
import sunset from '../images/sunset.jpg';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

const LandingContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

  img {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .start-drawing {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 40px;
    border: none;
    box-shadow: 5px 5px 20px rgba(0,0,0,0.2);
    cursor: pointer;
    color: white;
    background-color: #e056fd;
    border-radius: 4px;
    font-size: 20px;
    transition: all 0.2s ease-out;
    border: 1px solid #be2edd;

    :hover {
      background-color: #be2edd;
    }
  }
`;

const Landing = () => {
  const joinRoom = () => {
    window.location.href = '/100'
    socket.emit('join', {room: 100});
  };

  return(
    <LandingContainer>
      <img src={sunset} />
      <button 
        className='start-drawing'
        onClick={joinRoom}
      >
        Start drawing
      </button>
    </LandingContainer>
  );
};

export default Landing;