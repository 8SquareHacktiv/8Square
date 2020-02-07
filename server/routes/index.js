const routes = require("express").Router()
const geolocationRoute = require("./geolocationRoute")
const userRoutes = require("./user")

routes.use("/geo", geolocationRoute)
routes.use("/users", userRoutes)
const GoogleController = require("../controllers/googleController");

routes.post("/googleMaps", GoogleController.getData);

module.exports = routes