const User = require("../models").User
const generateToken = require('../helpers/generateToken')
const matchPass = require("../helpers/matchPassword")
const verifyTokenGoogle = require("../helpers/verifyTokenGoogle")

class ControlUser {
    static login(req, res, next) {
        // console.log(req.body)
        if (!req.body.email || !req.body.password) {
            next({ code: 400, message: "Please input required data" })
        } else {

            console.log("MASUK SINI WOI")
            User.findOne({ where: { email: req.body.email } })
                .then(userFound => {
                    // console.log(userFound, "<<")
                    if (userFound) {
                        let cocok = matchPass(req.body.password, userFound.password)
                        if (cocok) {
                            let token = generateToken({ id: userFound.id })
                            res.status(200).json({ userFound, token })
                        } else {
                            next({ code: 400, message: "Wrong password/email" })
                        }
                    } else {
                        next({ code: 404, message: "Wrong password/email" })
                    }
                })
                .catch(err => {
                    next(err)
                })
        }
    }

    static register(req, res, next) {
        // console.log(req.body, "<<")
        User.findOne({ where: { email: req.body.email } })
            .then(userAda => {
                if (userAda) {
                    next({ code: 400, message: "User already registered" })
                } else {
                    return User.create({
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email
                    })
                }
            })
            .then(userRegistered => {
                let token = generateToken({ id: userRegistered.id })
                res.status(201).json({ userRegistered, token })
                console.log(token, "<<")
            })
            .catch(err => {
                next(err)
            })
    }

    static google(req, res, next) {
        let email
        let username
        const tokenGoogle = req.body.id_token
        const payload = verifyTokenGoogle(tokenGoogle)
        payload.then(data => {
            email = data.email
            username = data.name
            return User.findOne({ where: { email: email } })
                .then(user => {
                    if (user) {
                        return user
                    } else {
                        return User.create({
                            username,
                            email,
                            password: process.env.DEFAULT_PASSWORD
                        })
                    }
                })
                .then(userGoogle => {
                    const token = generateToken({ id: userGoogle.id })
                    res.status(200).json({ userGoogle, token })
                })
                .catch(err => {
                    next(err)
                })
        })
    }
    static facebook(req, res, next) {
        User.findOne({ where: { email: req.body.email } })
            .then(usernyaKetemu => {
                if (usernyaKetemu) {
                    return usernyaKetemu
                } else {
                    return User.create({
                        username: req.body.username,
                        password: process.env.DEFAULT_PASSWORD,
                        email: req.body.email
                    })
                }
            })
            .then(userFacebook => {
                let token = generateToken({ id: userFacebook.id })
                res.status(201).json({ userFacebook, token })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControlUser