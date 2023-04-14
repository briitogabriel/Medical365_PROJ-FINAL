const { Sequelize } = require('sequelize');
const connection = require('../database/index');

const Nurse = connection.define('nurses', {
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  full_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  gender: {
    type: Sequelize.ENUM('M', 'F'),
  },

  date_of_birth: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },

  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  phone_number: {
    type: Sequelize.STRING
  },

  formation_institution: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  cofen_uf_registry: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Nurse;