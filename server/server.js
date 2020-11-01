const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const getUsersInRoom = require('./helpers/getUsersInRoom');

const users = [];

io.sockets.on('connection', socket => {
  console.log('User connected')

  socket.data = {}; // initialize

  // broadcast that you joined a new room
  socket.on('join', data => {
    const { name, room } = data;
    socket.data = data;

    if (!users.includes(socket)) users.push(socket);
    socket.join(room);

    const usersInRoom = getUsersInRoom(users, socket.data.room);
    io.in(room).emit('displayUsers', usersInRoom);
  });

  // broadcast drawing events to the room you're in
  socket.on('drawing', data => {
    io.in(socket.data.room).emit('drawing', data);
    console.log(data);
  });

  // check if you were previously in a room and leave it if you were
  socket.on('landedOnPage', path => {
    if (users.includes(socket) && socket.data.room !== path.slice(1)) {
      const prevRoom = socket.data.room;
      socket.data.room = null;

      const usersInRoom = getUsersInRoom(users, prevRoom);
      io.in(prevRoom).emit('displayUsers', usersInRoom);
      socket.leave(socket.data.room);
    }
  });

  // leave room and remove your socket if you disconnect from server
  socket.on('disconnect', () => {
    const socketIndex = users.indexOf(socket);
    users.splice(socketIndex, 1);

    const usersInRoom = getUsersInRoom(users, socket.data.room);
    io.in(socket.data.room).emit('displayUsers', usersInRoom);

    console.log('User disconnected');
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});