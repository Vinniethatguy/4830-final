const mongoose = require('mongoose')

login_userSchema = mongoose.Schema({
  email: {type: String, required: true},
  password : {type: String, required: true}
})

module.exports = mongoose.model('Login_User', login_userSchema)
