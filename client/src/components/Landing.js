import React, { useState } from 'react';
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

  .join-room-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;

    .name {

    }

    .room {

    }

    .join-room-btn {
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
  }
`;

const Landing = () => {
  const [ name, setName ] = useState('');
  const [ room, setRoom ] = useState('');

  const joinRoom = () => {
    socket.emit('join', {name, room});
  };

  socket.emit('landedOnPage');

  return(
    <LandingContainer>
      <img src={sunset} alt='sunset-background' />
      <div className='join-room-container'>

        <label className='name'>
          Name 
          <input value={name} onChange={e => setName(e.target.value)}/>
        </label>
        <label className='room'>
          Room 
          <input value={room} onChange={e => setRoom(e.target.value)}/>
        </label>

        <Link to={`/${room}`}>
          <button className='join-room-btn' onClick={joinRoom}>Start drawing</button>
        </Link>

      </div>
    </LandingContainer>
  );
};

export default Landing;