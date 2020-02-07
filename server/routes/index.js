const routes = require("express").Router()
const geolocationRoute = require("./geolocationRoute")
const userRoutes = require("./user")

routes.use("/geo", geolocationRoute)
routes.use("/users", userRoutes)

module.exports = routes