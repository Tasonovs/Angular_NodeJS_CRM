const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require('../config/keys')


module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})
    if (!candidate) {
        res.status(404).json({message: "⚠ Пользователь с таким email не найден."})
    }

    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (!passwordResult) {
        res.status(401).json({message: "⚠ Неверно введён пароль."})
    }

    const token = jwt.sign({
        email: req.body.email,
        userId: candidate._id
    }, keys.jwt, {expiresIn: 1*60*60})

    res.status(200).json({token: token})
}

module.exports.register = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        res.status(409).json({message: "⚠ Такой email уже существует."})
    }

    const salt = bcrypt.genSaltSync(10)
    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt)
    })

    try {
        await user.save()
        res.status(201).json({message: `Пользователь '${user.email}' создан.`, obj: user})
    } catch (error) {
        res.status(400).json({message: '⚠ Упс... Что-то пошло не так.'})
    }

}

