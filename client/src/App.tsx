import React, { useEffect, useState } from 'react';
import WhiteBoard from './components/WhiteBoard';
const io = require('socket.io-client');

const App = () => {
  const [socket, setSocket] = useState({});

  useEffect(() => {
    setSocket(io('http://localhost:3001'))
  },[]);

  return (
    <div>
      <WhiteBoard
        socket={socket}
      />
    </div>
  );
}

export default App;
