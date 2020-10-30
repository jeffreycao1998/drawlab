import React from 'react';
import styled from 'styled-components';
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

  }
`;

const Landing = () => {
  return(
    <LandingContainer>
      <img src={sunset} />
      <form 
        action={`/123`} 
        method='get'
      >
        <button 
          className='start-drawing'
          type='submit'
        >
          Start Drawing
        </button>
      </form>
    </LandingContainer>
  );
};

export default Landing;