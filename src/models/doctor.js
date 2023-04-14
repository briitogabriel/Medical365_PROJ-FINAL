const { Sequelize } = require('sequelize');
const connection = require('../database/index');

const Doctor = connection.define('doctors', {
  
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

  crm_uf_registry: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  specialization: {
    type: Sequelize.ENUM('Clínico Geral', 'Anestesia', 'Dermatologia', 'Ginecologia', 'Neurologia', 'Pediatra', 'Psiquiatria', 'Ortopedia'),
    allowNull: false,
  },

  system_status: {
    type: Sequelize.ENUM('Ativo', 'Inativo'),
    allowNull: false,
    defaultValue: 'Ativo'
  },

  total_services: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = Doctor;