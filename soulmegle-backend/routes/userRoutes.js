const express = require("express");
const { spawn } = require("child_process");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Function to get embeddings from Python
const getEmbeddings = (text) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", ["generate_embeddings.py"]);
    pythonProcess.stdin.write(text);
    pythonProcess.stdin.end();

    let data = "";
    pythonProcess.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    pythonProcess.stderr.on("data", (error) => {
      console.error("Python Error:", error.toString());
      reject(error.toString());
    });

    pythonProcess.on("close", (code) => {
      if (code === 0) {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject("Invalid JSON from Python");
        }
      } else {
        reject(`Python process exited with code ${code}`);
      }
    });
  });
};

// User signup endpoint
router.post("/", async (req, res) => {
  const { name, age, gender, hobbies } = req.body;

  if (!name || !age || !gender || !hobbies) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    console.log("Generating Embeddings for:", hobbies);
    const embedding = await getEmbeddings(hobbies);

    const result = await pool.query(
      "INSERT INTO users (name, age, gender, hobbies, embedding) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, age, gender, hobbies, embedding]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: `Error saving user: ${error}` });
  }
});

module.exports = router;
