const { authenticate } = require('passport/lib')
const bcrypt = require('bcrypt')

const LocalStrategy = require('passport-local').Strategy

 function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user =getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'No user with that email' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done (null, false, { message: 'Password incorrect' })
            } 
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        done(null, getUserById(id))
    })
 }

module.exports = initialize
