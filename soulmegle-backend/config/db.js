// config/db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false, // Change to console.log to see SQL logs
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Adjust based on your security requirements
    },
  },
});

module.exports = sequelize;
