const express = require('express');
const app = express();
require('dotenv').config({ path: './.env' });

const createPatient = require('./src/controllers/patient/createPatient');

const connection = require('./src/database/index');
connection.authenticate();
connection.sync();
console.log('Connected to database.');

app.use(express.json());

app.post('/api/patients', createPatient)

const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`App listenig on PORT ${PORT}`)});