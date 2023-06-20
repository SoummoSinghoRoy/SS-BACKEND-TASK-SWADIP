const authRoute = require('./authRoute');
const movieRoute = require('./movieRoute');

const routes = [
  {
    path: '/api/movie',
    handler: movieRoute
  },
  {
    path: '/api/auth',
    handler: authRoute
  },
  {
    path: '/',
    handler: (req, res) => {
      res.send('Server is running....')
    }
  },
]

module.exports = (app) => {
  routes.forEach(route => {
    if(route.path == '/') {
      app.get(route.path, route.handler)
    } else{
      app.use(route.path, route.handler)
    }
  })
}