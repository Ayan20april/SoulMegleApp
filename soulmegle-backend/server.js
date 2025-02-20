// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('SoulMegle backend is running with PostgreSQL...');
});

// Create HTTP server & Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

// Real-time chat
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Example: broadcast a chat message
  socket.on('chatMessage', (msg) => {
    // Broadcast the message to everyone
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Sync Database & Start Server
const PORT = process.env.PORT || 4000;

(async () => {
  try {
    // Sync models with DB (creates tables if not exist)
    await sequelize.sync({ alter: true }); 
    // If you prefer not to alter existing tables, use { force: false } or { alter: false }

    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
