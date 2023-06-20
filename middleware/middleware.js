const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const middlewares = [
  morgan('dev'),
  express.urlencoded({extended: true}),
  express.json(),
  cors()
]

module.exports = (app) => {
  middlewares.forEach(middleware => {
    app.use(middleware)
  })
}