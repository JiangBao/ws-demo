/**
 * websocket server
 */
const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('connect...');

  setInterval(() => {
    socket.emit('date-msg', new Date());
  }, 5000);

  socket.on('client-msg', (data) => {
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log('disconnection...');
  });
});

server.listen(3000);
