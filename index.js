const express = require('express');
const app = express();
require('dotenv').config({ path: './.env' });

const connection = require('./src/database/index');
connection.authenticate();
connection.sync();
console.log('Connected to database.');

app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`App listenig on PORT ${PORT}`)});