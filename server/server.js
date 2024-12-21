const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const moment = require('moment');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Enable CORS for your Next.js frontend
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from your Next.js frontend
  methods: ['GET', 'POST'],         // Allow GET and POST methods
  allowedHeaders: ['Content-Type'], // Optional, if you want to specify allowed headers
}));

// Add CORS configuration for Socket.io
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',  // Allow requests from your Next.js frontend
    methods: ['GET', 'POST'],         // Allow GET and POST methods
  }
});

const generateMockData = () => {
  const timestamp = moment.utc().toISOString();
  const value = Math.floor(Math.random() * 100); // Random temperature value
  return { created_at: timestamp, value };
};

io.on('connection', (socket) => {
  console.log('a user connected');
  setInterval(() => {
    const data = generateMockData();
    socket.emit('temperatureData', data); // Send data to client
  }, 4000); // Emit data every 5 seconds

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
