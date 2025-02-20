// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'non-binary'),
    allowNull: false,
  },
  hobbies: {
    type: DataTypes.STRING, // Could also be TEXT or an array if you prefer
    allowNull: false,
  },
});

module.exports = User;
