const express = require('express')
const mongoose = require('mongoose')
const bp = require('body-parser')
require('dotenv').config()
const cors = require('cors');


const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection

//Check if connection worked
database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

const routes = require('./routes/routes.js')


const app = express();

app.use(cors({
  origin: '*'
}));

app.use(bp.json())

app.use(bp.urlencoded({ extended: true }))

app.use('/api', routes)

app.use(express.json());

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})
