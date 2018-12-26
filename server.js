/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
require('connect-mongo')(session);
const path = require('path');

const routes = require('./routes');

const CLIENT_BUILT_DIRECTORY = path.join(__dirname, 'client/build');
const CLIENT_INDEX = path.join(CLIENT_BUILT_DIRECTORY, 'index.html');

const app = express();

app.use(express.static(CLIENT_BUILT_DIRECTORY));
app.get('', (req, res) => {
  res.sendFile(CLIENT_INDEX);
});

app.use(cors());

mongoose.connect(
  process.env.DB_HOST,
  {
    auth: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    useNewUrlParser: true
  }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use('/clocks', routes);

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

const port = process.env.PORT || 8080;
const listener = app.listen(port, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
