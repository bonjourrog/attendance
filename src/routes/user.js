const {Router} =require('express')
const router = Router()
const userController = require('../controllers/user')
const authController = require('../controllers/auth')

const enc = require('../lib/helpers')
const pool = require('../config/db')
const controller = require('../controllers/user')

router.get('/', authController.userAuthenticated, userController.index)

// NOTE: Settings routes
router.get('/settings', authController.userAuthenticated, userController.settings)

// NOTE: Report routes
router.get('/report', userController.report)
router.post('/report/:id', controller.addReport)

router.get('/add', async(req, res)=>{
    const pass = await enc.encryptPassword('1234')
    await pool.query('INSERT INTO administrator (id, userName, password, user_type) VALUES (id, ?, ?, ?) ', ['calix', pass, 1])
    res.redirect('/')
})

router.get('/dashboard', userController.dashboard);
router.get('/dashboard/getdata', userController.getData)

router.get('/teacher', userController.teacher)
router.post('/addteacher', userController.addTeacher)
router.post('/assignSubject/:id', userController.assignSubject)
router.post('/editteacher/:id', userController.editTeacher)


// NOTE: Subject
router.get('/subject', userController.subject)
router.post('/addsubject', userController.addSubject)



module.exports = router
