const Review = require("../models").Review
const User = require("../models").User
const Place = require("../models").Place

class ControlReview {
    static createReview(req, res, next) {
        let placenya
        let reviewUser
        let useridentity
        User.findOne({ where: { id: req.payload.id } })
            .then(userFound => {
                // console.log(userFound.dataValues, "<< ini usernya")
                useridentity = userFound.dataValues
                return Place.findAll({ where: { id: req.params.idAPIPlace } })
                    .then(placeFound => {
                        // console.log(placeFound, "<<")
                        if (placeFound[0]) {
                            return placeFound
                        } else {
                            // console.log(req.body.name, req.body.idAPI)
                            return Place.create({
                                name: req.body.name,
                                idAPI: req.params.idAPIPlace
                            })
                        }
                    })
                    .then(thisPlace => {
                        placenya = thisPlace.id
                        return Review.create({
                            UserId: req.payload.id,
                            PlaceId: thisPlace.id,
                            review: req.body.review,
                            rating: req.body.rating
                        })
                    })
                    .then(reviewCreated => {
                        // console.log(reviewCreated.dataValues, "ini ")
                        reviewUser = reviewCreated
                        return Review.findAll({ where: { PlaceId: placenya } })
                    })
                    .then(allReviewofSaidPlace => {
                        let tampungRating = []
                        for (let i of allReviewofSaidPlace) {
                            tampungRating.push(i.dataValues.rating)
                        }
                        let angka = 0
                        for (let j of tampungRating) {
                            angka += j
                        }
                        let ratingToDisplay = Math.floor(angka / tampungRating.length)
                        res.status(201).json({ ratingOverAll: ratingToDisplay, reviewUser: reviewUser, useridentity: useridentity })
                    })
            })
            .catch(err => {
                next(err)
            })
    }

    static getPlaceDetails(req, res, next) {
        let placenya
        Promise.all([Place.findOne({ where: { id: req.params.idPlace } }), Review.findAll({ where: { PlaceId: req.params.idPlace } })])
            .then(placeFound => {
                // console.log(placeFound[0].places);
                res.status(200).json(placeFound)
                // if (placeFound) {
                //     placenya = placeFound
                //     return Review.findAll({ where: { PlaceId: req.params.idPlace }, include: [User] })
                // } else {
                //     // console.log("masuk")
                //     next({ code: 404, message: "Place not found" })
                // }
            })
            // .then(dataFetched => {
            //     // console.log(dataFetched[0].dataValues)
            //     res.status(200).json({ allReview: dataFetched, placeDetail: placenya })
            // })
            .catch(err => {
                next(err)
            })
    }

    static updateReview(req, res, next) {
        let rating = req.body.rating
        let review = req.body.review
        let UserId = req.payload.id
        let PlaceId = req.placeId
        Review.update({
            rating,
            review,
            UserId,
            PlaceId
        }, { where: { id: req.params.idReview }, returning: true })
            .then(reviewUpdated => {
                res.status(200).json(reviewUpdated)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteReview(req, res, next) {
        Review.destroy({ where: { id: req.params.idReview } })
            .then(reviewFound => {
                res.status(200).json(reviewFound)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControlReview