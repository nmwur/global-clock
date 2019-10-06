/* eslint-disable no-console */
/* eslint-disable consistent-return */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const bodyParser = require('body-parser');
const clocks = require('./routes/clocks');
const auth = require('./routes/auth');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_HOST, {
  auth: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  },
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on('error', () => console.error('connection error:'));

app.use(
  session({
    secret: 'i love you',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
      ttl: 30 * 24 * 60 * 60 // 30 days
    })
  })
);

app.use('/clocks', clocks);
app.use('/auth', auth);

const CLIENT_BUILD_DIRECTORY = path.join(__dirname, 'client/build');
const CLIENT_INDEX = path.join(CLIENT_BUILD_DIRECTORY, 'index.html');
app.use(express.static(CLIENT_BUILD_DIRECTORY));
app.get('/', (req, res) => {
  res.sendFile(CLIENT_INDEX);
});

app.use((err, req, res) => {
  console.log('res.status:');
  console.log(res.status);
  console.log('===');
  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Your app is listening on port', port);
});

module.exports = app;
