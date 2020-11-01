import React, { useState } from 'react';
import styled from 'styled-components';
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

  socket.on('displayUsers', usersInRoom => {
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