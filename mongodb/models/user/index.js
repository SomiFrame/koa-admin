const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const S_User = new Schema({
    uer_id : ObjectId,
    email: String,
    password: String,
    name: String,
    registerTime: {
        type: Date,
        default: Date.now
    }
})
module.exports = S_User
