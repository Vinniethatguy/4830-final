const mongoose = require('mongoose')

contactSchema = mongoose.Schema({
  customername : {type: String, required: true},
  email: {type: String, required: true},
  message : {type: String, required: true}
})

module.exports = mongoose.model('Contact', contactSchema)
