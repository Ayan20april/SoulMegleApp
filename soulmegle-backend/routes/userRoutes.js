// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { Pool } = require("pg");
const OpenAI = require("openai");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// User signup endpoint
router.post("/", async (req, res) => {
  const { name, age, gender, hobbies } = req.body;

  try {
    // Get embeddings
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: hobbies,
    });

    console.log("OpenAI Response:", response); // Debugging

    if (!response.data || !response.data.length) {
      throw new Error("Embedding data is missing");
    }

    const embedding = response.data[0].embedding;

    // Insert user into PostgreSQL
    const result = await pool.query(
      "INSERT INTO users (name, age, gender, hobbies, embedding) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, age, gender, hobbies, embedding]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error saving user:", error.message);
    res.status(500).json({ error: "Error saving user" });
  }
});

// Other user routes can go here

module.exports = router;
