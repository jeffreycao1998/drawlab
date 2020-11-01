import React, { useState } from 'react';
import styled from 'styled-components';
import socket from '../socket';

const StyledHeader = styled.div`
  grid-area: header;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

const Controls = styled.ul`
  display: flex;

  .control {
    height: 30px;
    width: 30px;
    margin-right: 5px;
    list-style: none;
  }
`;

const Users = styled.ul`
  display: flex;

  .user {
    height: 30px;
    width: 30px;
    margin-left: 5px;
    list-style: none;
  }
`;

const Header = () => {
  const [ roomUsers, setRoomUsers ] = useState([]);

  socket.on('displayUsers', usersInRoom => {
    console.log(usersInRoom);
    setRoomUsers([...usersInRoom]);
  });

  const usersInRoom = roomUsers.map(user => <li className='user' key={user}>{user}</li>)


  return(
    <StyledHeader>
      <Controls>
        <li className='control'>File</li>
        <li className='control'>Edit</li>
        <li className='control'>View</li>
      </Controls>
      <Users>{usersInRoom}</Users>
    </StyledHeader>
  )
};

export default Header;