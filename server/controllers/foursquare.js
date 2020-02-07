const axios = require('axios')

class Foursquare {
    static fetchRecommendation(req, res, next) {
        axios.get('https://api.foursquare.com/v2/venues/explore', {params: {
            ll: req.body.ll,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            v: '20200207'
        }})
            .then(({response}) => {
                res.status(200).json(response)
            })
    }
}

module.exports = Foursquare
