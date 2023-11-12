const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('chat message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all connected users, excluding the sender
    socket.broadcast.emit('chat message', {
      username: socket.username,
      message: message,
    });
  });

  // Handle user authentication and set the username for the socket
  socket.on('user login', (username) => {
    socket.username = username;
    console.log('User logged in as:', username);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
