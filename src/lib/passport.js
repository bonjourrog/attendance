const passport = require('passport')
const helpers = require('./helpers')
const localStrategy = require('passport-local').Strategy

const pool = require('../config/db')

passport.use(
    new localStrategy
    (
        {
            usernameField:'userName',
            passwordField:'password'
        },
        async (userName, password, done)=>{
            try {

                const newUser = {
                    userName,
                    password
                }
                // NOTE: Verify if user exist
                const user = await pool.query('SELECT * FROM administrator WHERE userName = ?', [newUser.userName])
                if(user.length > 0){
                    // NOTE: Verify if passwords match
                    const pass = await helpers.verifyPassword(password, user[0].password)
                    console.log('verifyed or not ' + pass);
                    if(pass){
                        return done(null, user)
                    }else{
                        console.log('Contraseña incorrecta')
                        done (null, false, {
                            message:'contraseña incorrecta'
                        })
                    }
                }else{
                    console.log('Usuario no encontrado');
                    done(null, false, {
                        message:'Usuario no encontrado'
                    })
                }

                console.log(user);
            } catch (e) {
                console.log(`Error => ${e.message}`);
                return done(null, false, {
                    message:'usuario no encontrado'
                })
            }
        }
    )
)

passport.serializeUser((user, cb)=>{
    cb(null, user)
})

passport.deserializeUser((user, cb)=>{
    cb(null, user)
})

module.exports = passport
