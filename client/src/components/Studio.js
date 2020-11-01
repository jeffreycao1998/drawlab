import React, { useState } from 'react';
import styled from 'styled-components';
import socket from '../socket';

const StudioContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Studio = () => {
  const [ users, setUsers ] = useState([]);

  socket.on('joined', name => {
    setUsers(prev => [...prev, name]);
  });

  return(
    <StudioContainer>

    </StudioContainer>
  );
};