/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const { Router } = require("express");

const clocks = Router();

const { Clock } = require("../models");

clocks.use((req, res, next) => {
  if (!req.session.userId) {
    res.status(204).end();
  } else {
    next();
  }
});

clocks.param("id", (req, res, next, id) => {
  Clock.findById(id, (err, doc) => {
    if (err) return next(err);

    if (!doc) {
      const notFoundErr = new Error("Not found");
      notFoundErr.status = 404;
      return next(notFoundErr);
    }

    req.clock = doc;
    return next();
  });
});

clocks.get("/", (req, res, next) => {
  Clock.find({ userId: req.session.userId }, (err, clocks) => {
    if (err) return next(err);

    res.json(clocks);
  });
});

clocks.post("/", (req, res, next) => {
  const clock = new Clock({
    city: req.query.city,
    timezone: req.query.timezone,
    userId: req.session.userId
  });

  clock.save((err, newClock) => {
    if (err) return next(err);

    res.status(201);
    res.json(newClock);
  });
});

clocks.delete("/:id", (req, res, next) => {
  req.clock.remove(err => {
    if (err) return next(err);

    res.status(204);
    res.send("OK");
  });
});

module.exports = clocks;
