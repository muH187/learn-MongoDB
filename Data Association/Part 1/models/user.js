const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/miniProject1')

const userShema = mongoose.Schema({
    username: String,
    name: String,
    age: Number,
    email: String,
    password: String
})

module.exports = mongoose.model('user', userShema)