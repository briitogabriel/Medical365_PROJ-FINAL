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

  emergency_contact: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  allergies: {
    type: Sequelize.STRING,
  },

  special_cares: {
    type: Sequelize.STRING,
  },

  health_insurance: {
    type: Sequelize.STRING,
  },

  service_status: {
    type: Sequelize.ENUM('AGUARDANDO ATENDIMENTO', 'EM ATENDIMENTO', 'ATENDIDO', 'NÃO ATENDIDO'),
  },

  total_services: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = Patient;