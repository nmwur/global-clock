/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const { Router } = require("express");
const multer = require("multer");
const { OAuth2Client } = require("google-auth-library");

const auth = Router();
const upload = multer();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyToken(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  return ticket.getPayload();
}

auth.post("/tokensignin", upload.array(), async (req, res) => {
  try {
    const googleUserInfo = await verifyToken(req.body.idToken);
    req.session.userId = googleUserInfo.sub;
    req.session.userPic = googleUserInfo.picture;
    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
    res.status(204).end();
  } catch (error) {
    console.error(error);
  }
});

auth.get("/tokensignout", (req, res) => {
  req.session.destroy();
  res.status(204).end();
});

auth.get("/userpicurl", (req, res) => {
  res.send(req.session.userPic);
});

module.exports = auth;
