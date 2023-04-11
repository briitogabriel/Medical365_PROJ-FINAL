const { Sequelize } = require('sequelize');
const connection = require('../database/index');

const Patient = connection.define('patients', {
  
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
    type: Sequelize.STRING,
    allowNull: false,
  },

  date_of_birth: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  telephone: {
    type: Sequelize.STRING(14), // (xx)yyyyy-yyyy
    allowNull: false,
  },

  emergency_contact: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  alergies: {
    type: Sequelize.STRING,
  },

  special_cares: {
    type: Sequelize.STRING,
  },

  health_insurance: {
    type: Sequelize.STRING,
  },

  service_status: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  total_services: {
    type: Sequelize.INTEGER
  }
});

module.exports = Patient;