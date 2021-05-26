 const express = require('express')
 const path = require('path')
 const morgan = require('morgan')
 const flash = require('connect-flash')
 const session = require('express-session')
 const cookie = require('cookie-parser')
 const MySqlStore = require('express-mysql-session')
 const passport = require('./lib/passport')
 const app = express()

 const {database} = require('./config/keys')

 const userRoutes = require('./routes/user')
 const authRoutes = require('./routes/auth')

 app.set('port', process.env.PORT || 3000)
 app.set('view engine', 'ejs')
 app.set('views', path.join(__dirname,'views'))

 app.use(flash())
 app.use(cookie())
 app.use(session({
    secret:'My secret',
    resave:false,
    saveUninitialize:false,
    store: new MySqlStore(database)
 }))
 app.use(passport.initialize())
 app.use(passport.session())
 app.use(express.urlencoded({extended:false}))
 app.use(morgan('dev'))
 app.use(express.static(path.join(__dirname, 'public')))
 app.use(express.json())

 app.use((req, res, next)=>{
     res.locals.message = req.flash('message')
     next()
 })


 app.use('/', userRoutes)
 app.use('/auth', authRoutes)


 app.listen(app.get('port'), ()=>{
     console.log(`Listening on port ${app.get('port')}`);
 })
