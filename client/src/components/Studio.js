import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  useLocation
} from 'react-router-dom';

import socket from '../socket';

import Header from './Header';
import ControlsLeft from './ControlsLeft';
import Canvas from './Canvas';
import ControlsRight from './ControlsRight';

const StudioContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: grid;
  grid-template-areas: 
    "header header header header header header header header header header header header"
    "controlsLeft canvas canvas canvas canvas canvas canvas canvas canvas canvas controlsRight controlsRight";
  grid-template-columns: 43px auto 300px;
  grid-template-rows: 43px auto;
  background-color: #9b59b6;
`;

const Studio = () => {
  const location = useLocation();
  
  useEffect(() => {
    socket.emit('landedOnPage', location.pathname);
  },[location.pathname]);

  return(
    <StudioContainer>
      <Header />
      <ControlsLeft />
      <Canvas />
      <ControlsRight />
    </StudioContainer>
  );
};

export default Studio;