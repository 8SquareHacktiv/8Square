const router = require('express').Router()
const Foursquare = require('../controllers/foursquare')

router.get('/recomended/:ll', Foursquare.fetchRecommendation)

module.exports = router
