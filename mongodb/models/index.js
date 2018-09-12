const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/koa-admin'
const connection = mongoose.createConnection(url);

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const S_User = new Schema({
    uer_id : ObjectId,
    email: String,
    password: String,
    name: String
})
const S_Tag = new Schema({
    name: String
})
const M_User = connection.model('user',S_User)

module.exports = {
    M_User
}
