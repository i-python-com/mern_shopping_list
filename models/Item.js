const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ItemSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // connect to _id in User model
    ref: 'user' // reference to User model
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Item = mongoose.model('item', ItemSchema)
