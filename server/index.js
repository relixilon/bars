const express = require('express')
const mongoose = require('mongoose')
const bp = require('body-parser')
require('dotenv').config()
const cors = require('cors');
const cookieSession = require("cookie-session")

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

var whitelist = [
  'http://192.168.1.13:8080',
];
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
app.use(cors(corsOptions));


app.use(
  cookieSession({
    name: "session",
    secret: process.env.AUTH_SECRET, // should use as secret environment variable
    httpOnly: true
  })
);

app.use(bp.json({ limit: '99999999999999999' }));


app.use(express.urlencoded({ extended: true }));

app.use(bp.urlencoded({ extended: true }));

app.use(bp.urlencoded({ extended: true }));

//routes



app.use('/api', routes)
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)


app.use(express.json());

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`)
})
