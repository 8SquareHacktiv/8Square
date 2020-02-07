const routes = require("express").Router()
const controlReview = require("../controllers/controlReview")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

routes.post("/:idAPIPlace", authentication, controlReview.createReview)
routes.get("/:idPlace", controlReview.getPlaceDetails)
routes.put("/:idReview", authentication, authorization, controlReview.updateReview)
routes.delete("/:idReview", authentication, authorization, controlReview.deleteReview)



module.exports = routes