const Router = require("express")
const router = new Router()
const controller = require("./authController")
const {check} = require("express-validator")
const authMiddleware = require("./middleware/authMiddleware")
const roleMiddleware = require("./middleware/roleMiddleware")


router.post('/registration', [
   check('username', "Username cannot be empty").notEmpty(),
   check('password', "Password cannot be less than 8 and more than 24").isLength({min: 8, max: 24}),
], controller.registration)

router.post('/login', controller.login)
router.get('/ws',roleMiddleware(['USER', 'ADMIN']), controller.CotnectWS)

module.exports = router
