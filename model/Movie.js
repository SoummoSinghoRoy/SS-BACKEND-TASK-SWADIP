const { Schema, model } = require("mongoose");

const MovieSchema = new Schema({
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
    type: String,
    required: true,
    set: (value) => {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
  
      return `${hours}h ${minutes}m`;
    },
  },
  detail: {
    type: String,
    required: true
  },
  poster: String
})

const Movie = model('Movie', MovieSchema);

module.exports = Movie;