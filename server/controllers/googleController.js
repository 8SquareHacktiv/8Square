const axios = require('axios');

class GoogleContoller {
    static getData(req, res, next) {
        const start = req.body.start;
        const end = req.body.end;
        const apiKey = process.env.GOOGLE_API_KEY;
        axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${start}&destinations=${end}&key=${apiKey}`)
            .then(function (response) {
                const arr = [];
                const jsonString = JSON.stringify(response, function (key, val) {
                    if (typeof val == "object" && val != null) {
                        if (arr.indexOf(val) != -1) {
                            return;
                        }
                        arr.push(val);
                    }
                    return val;
                });
                res.status(200).json(JSON.parse(jsonString));
            })
            .catch(function (err) {
                next(err)
            })
    }
}

module.exports = GoogleContoller