const Sequelize = require('sequelize');

require('dotenv').config({ path: './.env' });

const connection = new Sequelize({
  dialect: process.env.DIALECT_PG || 'postgres',
  host: process.env.HOST_PG || 'localhost',
  username: process.env.USERNAME_PG || 'admin',
  password: process.env.PASSWORD_PG || 'password',
  database: process.env.PORT_PG || 'databaseName',
  port: process.env.DATABASE_NAME || 0000,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
});

module.exports = connection;