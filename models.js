const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClockSchema = new Schema(
  {
    city: String,
    timezone: Number
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, { city, timezone }) => ({
        // eslint-disable-next-line no-underscore-dangle
        id: doc._id,
        city,
        timezone
      })
    }
  }
);

const Clock = mongoose.model('Clock', ClockSchema);

module.exports = Clock;
