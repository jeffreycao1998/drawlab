const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');

app.use(bodyParser.json());

io.sockets.on('connection', socket => {
  console.log('User connected')

  socket.on('join', data => {
    const { name, room } = data;

    socket.data = {
      name,
      room
    };

    socket.join(room);
    io.in(room).emit('joined', data.name);
  });

  socket.on('drawing', data => {
    const { room } = socket.data;

    io.in(room).emit('drawing', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});