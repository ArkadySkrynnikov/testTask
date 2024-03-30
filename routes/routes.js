const Router = require('express')
const controller = require('./routerController')
const router = new Router()

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/test', controller.test)

module.exports = router