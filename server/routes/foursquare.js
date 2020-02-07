const router = require('express').Router()
const Foursquare = require('../controllers/foursquare')

router.get('/recomended', Foursquare.fetchRecommendation)

module.exports = router
