    const router = require('express').Router()
    const Foursquare = require('../controllers/foursquare')

    router.get('/recommended', Foursquare.fetchRecommendation)

    module.exports = router
