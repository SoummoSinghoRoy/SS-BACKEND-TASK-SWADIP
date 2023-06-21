const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const passport = require('./passport');

const middlewares = [
  morgan('dev'),
  express.urlencoded({extended: true}),
  express.json(),
  express.static('public'),
  cors(),
  cookieParser(),
  passport.initialize()
]

module.exports = (app) => {
  middlewares.forEach(middleware => {
    app.use(middleware)
  })
}