<<<<<<< HEAD
const routes = require("express").Router()
const geolocationRoute = require("./geolocationRoute")
const userRoutes = require("./user")
<<<<<<< HEAD
const reviewRoutes = require("./review")
=======
const foursquareRoutes = require('./foursquare')
const GoogleController = require("../controllers/googleController");
>>>>>>> get data foursquare

routes.use("/geo", geolocationRoute)
routes.use("/users", userRoutes)
routes.post("/googleMaps", GoogleController.getData);
<<<<<<< HEAD
routes.use("/review", reviewRoutes)
=======
=======
const routes = require('express').Router()
const geolocationRoute = require('./geolocationRoute')
const userRoutes = require('./user')
const foursquareRoutes = require('./foursquare')
const GoogleController = require('../controllers/googleController')

routes.use('/geo', geolocationRoute)
routes.use('/users', userRoutes)
routes.post('/googleMaps', GoogleController.getData)
>>>>>>> - coonsume api data
routes.use('/foursquare', foursquareRoutes)
>>>>>>> get data foursquare

module.exports = routes
