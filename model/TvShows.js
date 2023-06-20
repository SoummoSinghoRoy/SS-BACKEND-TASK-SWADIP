const { Schema, model } = require("mongoose");
const moment = require('moment');

const TvShowSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  actor: {
    type: String,
    required: true,
    trim: true
  },
  actress: {
    type: String,
    required: true,
    trim: true
  },
  director: {
    type: String,
    required: true,
    trim: true
  },
  producer: {
    type: String,
    required: true,
    trim: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    get: (value) => {
      const duration = moment.duration(value, 'minutes');
      const hours = duration.hours();
      const minutes = duration.minutes();

      return `${hours}h ${minutes}m`;
    },
    set: (value) => {
      const duration = moment.duration(value);
      return duration.asMinutes();
    }
  },
  detail: {
    type: String,
    required: true
  },
  poster: String
})

const TvShow = model('TvShow', TvShowSchema);

module.exports = TvShow;