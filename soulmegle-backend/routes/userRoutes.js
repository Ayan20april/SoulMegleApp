// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/', async (req, res) => {
  try {
    const { name, age, gender, hobbies } = req.body;
    const newUser = await User.create({ name, age, gender, hobbies });
    return res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
});

// Get all users (for testing)
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
});

// Simple matching route (example)
router.get('/match', async (req, res) => {
  try {
    // This is a naive matching approach:
    // 1) We get the query from the client (e.g. age, gender, or hobbies)
    // 2) We find a user who matches
    // 3) Return that user
    const { age, gender, hobbies } = req.query;
    const query = {};

    if (age) query.age = age;
    if (gender) query.gender = gender;
    if (hobbies) {
      // basic "contains" approach
      query.hobbies = { [require('sequelize').Op.iLike]: `%${hobbies}%` };
    }

    const matchUser = await User.findOne({ where: query });
    if (!matchUser) {
      return res.status(404).json({ message: 'No matching user found' });
    }
    return res.json(matchUser);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
