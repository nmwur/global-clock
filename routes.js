/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
const { Router } = require('express');

const router = Router();

const Clock = require('./models');

router.param('id', (req, res, next, id) => {
  Clock.findById(id, (err, doc) => {
    if (err) return next(err);

    if (!doc) {
      const notFoundErr = new Error('Not found');
      notFoundErr.status = 404;
      return next(notFoundErr);
    }

    req.clock = doc;
    return next();
  });
});

router.get('/', (req, res, next) => {
  Clock.find((err, clocks) => {
    if (err) return next(err);

    res.json(clocks);
  });
});

router.post('/', (req, res, next) => {
  const clock = new Clock({
    city: req.query.city,
    timezone: req.query.timezone
  });

  clock.save((err, newClock) => {
    if (err) return next(err);

    res.status(201);
    res.json(newClock);
  });
});

router.delete('/:id', (req, res, next) => {
  req.clock.remove((err) => {
    if (err) return next(err);

    res.status(204);
    res.send('OK');
  });
});

module.exports = router;
