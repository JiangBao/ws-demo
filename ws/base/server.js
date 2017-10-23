/**
 * websocket server
 */
const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8080});

// broadcast to all
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState == WebSocket.OPEN) {
      client.send(data);
    }
  })
}

// listen events
wss.on('connection', function(ws, req) {
  console.log(`someone connect: ${req.connection.remoteAddress}`);
  ws.on('message', function onMessage(msg) {
    console.log(`Received: ${msg}`);
    wss.broadcast('this is broadcast');
  });

  ws.send('something');
})