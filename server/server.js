const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const users = [];

const getUsersInRoom = (users, room) => {
  return users
    .filter(socket => socket.data.room === room)
    .map(socket => socket.data.name);
};

io.sockets.on('connection', socket => {
  console.log('User connected')

  socket.data = {};

  socket.on('join', data => {
    const { name, room } = data;
    socket.data = data;

    if (users.includes(socket)) {
      const prevRoom = socket.data.room;
      socket.join(room);
    } else {
      socket.join(room);
      users.push(socket);
    }

    const usersInRoom = getUsersInRoom(users, socket.data.room);
    io.in(room).emit('displayUsers', usersInRoom);
  });

  socket.on('drawing', data => {
    io.in(socket.data.room).emit('drawing', data);
  });

  socket.on('landedOnPage', () => {
    if (users.includes(socket)) {
      const prevRoom = socket.data.room;
      socket.data.room = null;

      const usersInRoom = getUsersInRoom(users, prevRoom);
      io.in(prevRoom).emit('displayUsers', usersInRoom);
      socket.leave(socket.data.room);
    }
  });

  socket.on('disconnect', () => {
    users.splice(users.indexOf(socket), 1);

    const usersInRoom = getUsersInRoom(users, socket.data.room);
    io.in(socket.data.room).emit('displayUsers', usersInRoom);

    console.log('User disconnected');
  });

});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});