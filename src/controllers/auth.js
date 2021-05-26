const passport = require('passport')
const controller = {}

controller.authenticateUser = passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/auth/login',
    failureFlash:true,
    badRequestMessage:'Ambos campos son obligatorios'
})

// NOTE: Verify if user is already loged
controller.userAuthenticated = (req, res, next)=>{
    //It is
    if(req.isAuthenticated()){
        return next()
    }

    // NOTE: it isn't
    return res.redirect('/auth/login')
}

controller.userNotAuthenticated = (req, res, next)=>{
    !req.isAuthenticated() ? next() : res.redirect('/')
}

controller.login_screen = (req, res)=>{
    res.render('login')
}

controller.logout = (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/auth/login')
        console.log('Sesión destruida');
    })
}



module.exports = controller
