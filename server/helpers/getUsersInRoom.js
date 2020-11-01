const getUsersInRoom = (users, room) => {
  return users
    .filter(socket => socket.data.room === room)
    .map(socket => socket.data.name);
};

module.exports =  getUsersInRoom;