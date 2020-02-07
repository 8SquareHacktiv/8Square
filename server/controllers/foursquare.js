const axios = require('axios')

class Foursquare {
  static fetchRecommendation(req, res, next) {
    axios
      .get('https://api.foursquare.com/v2/venues/explore', {
        params: {
          ll: req.params.ll,
          client_id: process.env.CLIENT_ID4,
          client_secret: process.env.CLIENT_SECRET,
          v: '20200206'
        }
      })
      .then(({ data }) => {
        const result = data.response.groups[0].items
        const placeLL = []
        const venues = []
        result.forEach(el => {
          const address = el.venue.location.formattedAddress.join(', ')
          let temp = el.venue.location.lat + ',' + el.venue.location.lng
          let obj = {
            id: el.venue.id,
            name: el.venue.name,
            address: address,
            category: el.venue.categories[0].name
          }
          venues.push(obj)
          placeLL.push(temp)
        })
        res.status(200).json({ venues: venues, locations: placeLL })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = Foursquare
