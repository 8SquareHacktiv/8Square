const routes = require("express").Router()
const controlGeo = require("../controllers/geolocation")

routes.post("/", controlGeo.getLocation)

module.exports = routes