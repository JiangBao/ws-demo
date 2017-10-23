/**
 * websocket server
 */
const WebSocket = require('ws'),
      express = require('express');

const app = express();

app.use((req, res) => {
  res.send({msg: 'hello'});
});

const server = app.listen(3000, () => {
  console.log('server start success on port 3000');
});
const wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws, req) {
  ws.on('message', function onMessage(msg) {
    console.log(`Received: ${msg}`);
  })

  ws.send('something');
})