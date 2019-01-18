const mongoose = require("mongoose");

const { Schema } = mongoose;

const ClockSchema = new Schema(
  {
    city: String,
    timezone: String,
    order: Number,
    userId: String
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, { city, timezone, order }) => ({
        // eslint-disable-next-line no-underscore-dangle
        id: doc._id,
        city,
        timezone,
        order
      })
    }
  }
);

const Clock = mongoose.model("Clock", ClockSchema);

module.exports = { Clock };
