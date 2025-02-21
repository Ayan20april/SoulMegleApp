const express = require('express');
const router = express.Router();
const { Pool } = require("pg");

// Initialize PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// User signup endpoint
router.post("/", async (req, res) => {
  const { name, age, gender, hobbies } = req.body;

  try {
    if (!name || !age || !gender || !hobbies) {
      return res.status(400).json({ error: "All fields are required" });
    }

    console.log("Received Data:", { name, age, gender, hobbies });

    // Dynamically import fetch (inside the function to ensure it's initialized)
    console.log("Sending to Hugging Face:", JSON.stringify({ inputs: [hobbies] }));

    const fetch = (await import("node-fetch")).default;

    // Fetch embeddings from Hugging Face API
    // Fetch embeddings from Hugging Face
    const response = await fetch(
    "https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: [hobbies] }), // Fix: Wrap hobbies in an array
    }
  );


    const data = await response.json();
    console.log("Hugging Face Response:", JSON.stringify(data, null, 2)); // Log full response

    // Ensure we correctly extract embeddings
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("Embedding data is missing or invalid");
    }

    const embedding = data[0].embedding || data[0]; // Adjust if structure is different
    console.log("Extracted Embedding:", embedding);

    // Insert user into PostgreSQL
    const result = await pool.query(
      "INSERT INTO users (name, age, gender, hobbies, embedding) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, age, gender, hobbies, embedding]
    );

    console.log("User Inserted:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error saving user:", error.message);
    res.status(500).json({ error: `Error saving user: ${error.message}` });
  }
});

module.exports = router;
