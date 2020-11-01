import React, { useState } from 'react';
import styled from 'styled-components';
import {
  useLocation
} from 'react-router-dom';

import socket from '../socket';

import Canvas from './Canvas';

const StudioContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Users = styled.ul`
  position: absolute;
`;

const Studio = () => {
  const [ roomUsers, setRoomUsers ] = useState([]);
  
  socket.emit('landedOnPage', useLocation().pathname);

  socket.on('displayUsers', usersInRoom => {
    console.log(usersInRoom);
    setRoomUsers([...usersInRoom]);
  });

  const usersInRoom = roomUsers.map(user => <li className='user' key={user}>{user}</li>)

  return(
    <StudioContainer>
      <Users>{usersInRoom}</Users>
      <Canvas />
    </StudioContainer>
  );
};

export default Studio;