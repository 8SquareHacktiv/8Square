const routes = require('express').Router()
const geolocationRoute = require('./geolocationRoute')
const userRoutes = require('./user')
const reviewRoutes = require('./review')
const foursquareRoutes = require('./foursquare')
const GoogleController = require('../controllers/googleController')

routes.use('/review', reviewRoutes)
routes.use('/geo', geolocationRoute)
routes.use('/users', userRoutes)
routes.post('/googleMaps', GoogleController.getData)
routes.use('/foursquare', foursquareRoutes)

module.exports = routes
