const { Sequelize } = require('sequelize');
const connection = require('../database/index');

const Patient = require('./patient');
const Doctor = require('./doctor');

const Service = connection.define('services', {
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  doctor_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  patient_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Service.belongsTo(Patient);
Service.belongsTo(Doctor);

module.exports = Service;