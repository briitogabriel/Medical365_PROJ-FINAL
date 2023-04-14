const express = require('express');
const app = express();
require('dotenv').config({ path: './.env' });

const connection = require('./src/database/index');
connection.authenticate();
connection.sync();
console.log('Connected to database.');

const createPatient = require('./src/controllers/patient/createPatient');
const updatePatient = require('./src/controllers/patient/updatePatient');
const updateServiceStatus = require('./src/controllers/patient/updateServiceStatus');
const findPatient = require('./src/controllers/patient/findPatient');
const findPatientById = require('./src/controllers/patient/findPatientById');
const deletePatient = require('./src/controllers/patient/deletePatient');

const createDoctor = require('./src/controllers/doctor/createDoctor');
const updateDoctor = require('./src/controllers/doctor/updateDoctor');
const updateDoctorStatus = require('./src/controllers/doctor/updateDoctorStatus');
const findDoctor = require('./src/controllers/doctor/findDoctor');
const findDoctorById = require('./src/controllers/doctor/findDoctorById');
const deleteDoctor = require('./src/controllers/doctor/deleteDoctor');

const createNurse = require('./src/controllers/nurse/createNurse');
const updateNurse = require('./src/controllers/nurse/updateNurse');
const findNurse = require('./src/controllers/nurse/findNurse');
const findNurseById = require('./src/controllers/nurse/findNurseById');
const deleteNurse = require('./src/controllers/nurse/deleteNurse');

app.use(express.json());

app.post('/api/patients', createPatient);
app.put('/api/patients/:id', updatePatient);
app.patch('/api/patients/:id/status', updateServiceStatus);
app.get('/api/patients', findPatient);
app.get('/api/patients/:id', findPatientById);
app.delete('/api/patients/:id', deletePatient);

app.post('/api/doctors', createDoctor);
app.put('/api/doctors/:id', updateDoctor);
app.patch('/api/doctors/:id/status', updateDoctorStatus);
app.get('/api/doctors', findDoctor);
app.get('/api/doctors/:id', findDoctorById);
app.delete('/api/doctors/:id', deleteDoctor);

app.post('/api/nurses', createNurse);
app.put('/api/nurses/:id', updateNurse);
app.get('/api/nurses', findNurse);
app.get('/api/nurses/:id', findNurseById);
app.delete('/api/nurses/:id', deleteNurse);

const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`App listenig on PORT ${PORT}`)});