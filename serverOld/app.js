const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let socketId;

io.on('connection', socket => {
  console.log('a user connected');
  socketId = socket.id;
  console.log(socketId);

  socket.on('draw', (data) => {
    console.log(data.x, data.y);
    // socket.broadcast.emit('draw', data);
    socket.to(socketId).emit('draw', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3001, () => {
  console.log('listening on port 3001');
});