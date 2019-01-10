/* eslint-disable no-console */
/* eslint-disable consistent-return */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const { OAuth2Client } = require("google-auth-library");
const bodyParser = require("body-parser");
const multer = require("multer");
const routes = require("./routes");

const client = new OAuth2Client(process.env.CLIENT_ID);

const app = express();

app.use(cors());

const upload = multer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
db.on("error", console.error.bind(console, "connection error:"));

app.use(
  session({
    secret: "i love you",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
      ttl: 30 * 24 * 60 * 60 // 30 days
    })
  })
);

app.use("/clocks", routes);

const CLIENT_BUILT_DIRECTORY = path.join(__dirname, "client/build");
const CLIENT_INDEX = path.join(CLIENT_BUILT_DIRECTORY, "index.html");
app.use(express.static(CLIENT_BUILT_DIRECTORY));
app.get("/", (req, res) => {
  res.sendFile(CLIENT_INDEX);
});

async function verifyToken(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.CLIENT_ID
  });

  return ticket.getPayload();
}

app.post("/tokensignin", upload.array(), async (req, res) => {
  try {
    const googleUserInfo = await verifyToken(req.body.idToken);
    console.log(googleUserInfo);
    req.session.userId = googleUserInfo.sub;
    req.session.userPic = googleUserInfo.picture;
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
    res.status(204).end();
  } catch (error) {
    console.error(error);
  }
});

app.get("/tokensignout", (req, res) => {
  req.session.destroy();
  res.status(204).end();
});

app.get("/userpicurl", (req, res) => {
  res.send(req.session.userPic);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Your app is listening on port", port);
});

module.exports = app;
