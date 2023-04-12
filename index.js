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

app.use(express.json());

app.post('/api/patients', createPatient)
app.put('/api/patients/:id', updatePatient)
app.patch('/api/patients/:id/status', updateServiceStatus)

const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`App listenig on PORT ${PORT}`)});