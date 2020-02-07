const routes = require("express").Router()
const controlUser = require("../controllers/controlUser")

routes.post("/register", controlUser.register)
routes.post("/login", controlUser.login)
routes.post("/google", controlUser.google)
routes.post("/facebook", controlUser.facebook)

module.exports = routes