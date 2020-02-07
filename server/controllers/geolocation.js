const axios = require("axios")
class Geolocation {
    static getLocation(req, res, next) {
        axios({
            method: "GET",
            url: `http://api.ipstack.com/${req.body.ipAddress}`,
            params: {
                access_key: "4491779a821e14e92257755f76b08055"
            }
        })
            .then(hasilnya => {
                const arr = [];
                const str = JSON.stringify(hasilnya, function (key, value) {
                    if (typeof value == "object" && value != null) {
                        if (arr.indexOf(value) !== -1) {
                            return
                        }
                        arr.push(value);
                    }
                    return value;
                });
                res.status(200).json(JSON.parse(str))
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Geolocation