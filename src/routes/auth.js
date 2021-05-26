const {Router} =require('express')
const router = Router()
const authController = require('../controllers/auth')

router.get('/login', authController.login_screen)
router.post('/login', authController.authenticateUser)

router.get('/logout', authController.logout)

module.exports = router
