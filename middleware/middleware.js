const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const config = require('config');
const MongoDBStore = require('connect-mongodb-session')(session);

const passport = require('./passport');

const store = new MongoDBStore({
  uri: config.get("db-uri"),
  collection: 'sessions',
  expires: 1000 * 60 * 60 * 2,
})

const middlewares = [
  morgan('dev'),
  express.urlencoded({extended: true}),
  express.json(),
  express.static('public'),
  cors(),
  session({
    secret: config.get('secret') || 'Secret Cat',
    resave: false,
    saveUninitialized: false,
    store: store
  }),
  passport.initialize(),
  passport.session(),
]

module.exports = (app) => {
  middlewares.forEach(middleware => {
    app.use(middleware)
  })
}