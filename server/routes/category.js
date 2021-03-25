const express = require('express')
const passport = require('passport')
const router = express.Router()

const controller = require("../controllers/category")
const upload = require('../middleware/upload')

//TODO Подумать, как сделать так, чтобы не писать passport.authenticate в каждом route
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', controller.getById)
router.delete('/:id', controller.delete)
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update)

module.exports = router