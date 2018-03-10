const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  url: {type: String, required: true},
  originalText: {type: String, required: true},
  userText: {type: String, required: true},
  isApproved: {type: Boolean, required: true, default: false},
  createdAt: {type: Date, required: true, index: true},
  updatedAt: {type: Date, required: true, index: true}
}, {
  retainKeyOrder: true
})

schema.pre('validate', function (next) {
  let updatedAt = new Date()

  if (this.isNew) {
    this.createdAt = updatedAt
  }

  this.updatedAt = updatedAt

  next()
})

let Article = mongoose.model('Article', schema)

module.exports = Article
