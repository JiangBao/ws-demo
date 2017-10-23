# ws-demo
some demos about websocket usage(ws &amp; socket.io)

include the main usage about npm package [`ws`](https://github.com/websockets/ws) & [`socket.io`](https://github.com/socketio/socket.io)

difference between `ws` & `socket.io`
* ws is just a Node.js WebSocket library
* Socket.IO is not a WebSocket implementation. Although Socket.IO indeed uses WebSocket as a transport when possible, it adds some metadata to each packet: the packet type, the namespace and the ack id when a message acknowledgement is needed. That is why a WebSocket client will not be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a WebSocket server