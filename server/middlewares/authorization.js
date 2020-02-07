const User = require("../models").User
const Review = require("../models").Review

function forUD(req, res, next) {
    Review.findOne({ where: { id: req.params.idReview } })
        .then(reviewFound => {
            if (reviewFound) {
                if (reviewFound.UserId == req.payload.id) {
                    req.placeId = reviewFound.PlaceId
                    next()
                } else {
                    next({ code: 401, message: "Unauthorized" })
                }
            } else {
                next({ code: 404, message: "Review not found" })
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = forUD