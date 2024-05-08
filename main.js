// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('New client connected');

  ws.on('message', function incoming(message) {
    // Broadcast message to all clients
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', function() {
    console.log('Client disconnected');
  });
});

server.listen(3000, function() {
  console.log('Server started on port 3000');
});
