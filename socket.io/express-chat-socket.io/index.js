/**
 * server entry
 */
const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
app.use(express.static(path.join(__dirname, 'public')));

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.broadcast.emit('connected');

//   socket.on('chat message', (msg) => {
//     console.log(`msg: ${msg}`);
//     io.emit('chat message', msg);
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//     socket.broadcast.emit('disconnected');
//   });
// });

var numUsers = 0;

io.on('connection', (socket) => {
  let addedUser = false;

  socket.on('new message', (data) => {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  socket.on('add user', (username) => {
    if (addedUser) return;
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });

    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  })

  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});;

http.listen(port, () => {
  console.log(`server start success at port ${port}`);
});