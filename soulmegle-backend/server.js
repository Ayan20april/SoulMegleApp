// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { Pool } = require("pg");
//const OpenAI = require("openai");

//Import your Sequelize connection and user routes
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware setup
app.use(cors({ origin: "*" })); // Allow all domains for development
app.use(express.json());

// Set up PostgreSQL connection using pg
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Render
});

// Initialize OpenAI with your API key
//const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Root endpoint for testing
app.get('/', (req, res) => {
  res.send('SoulMegle backend is running with PostgreSQL...');
});

// Use your userRoutes for standard user endpoints (signup, etc.)
app.use('/api/users', userRoutes);

// Matching Endpoint: Finds the most similar user based on vector embeddings
app.get('/api/match/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    // Retrieve the current user's embedding from the database
    const userQuery = await pool.query("SELECT embedding FROM users WHERE id = $1", [userId]);
    if (userQuery.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const userEmbedding = userQuery.rows[0].embedding;

    // Use the pgvector similarity operator (<=>) to calculate cosine similarity
    const matchQuery = await pool.query(
      "SELECT id, name, age, gender, hobbies, 1 - (embedding <=> $1) AS similarity FROM users WHERE id != $2 ORDER BY similarity DESC LIMIT 1",
      [userEmbedding, userId]
    );

    if (matchQuery.rows.length === 0) {
      return res.status(404).json({ error: "No match found" });
    }
    res.json(matchQuery.rows[0]);
  } catch (error) {
    console.error("Error finding match:", error);
    res.status(500).json({ error: "Error finding match" });
  }
});

// Create HTTP server and initialize Socket.io for real-time chat
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

// Socket.io connection logic
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Listen for chat messages and broadcast them
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server after syncing the Sequelize models
const PORT = process.env.PORT || 4000;
(async () => {
  try {
    await sequelize.sync({ alter: true });
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
