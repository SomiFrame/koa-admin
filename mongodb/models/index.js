const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/koa-admin'
const connection = mongoose.createConnection(url);

const M_User = connection.model('user',require('./user'))
const M_Tag = connection.model('tag',require('./tag'))

module.exports = {
    M_User,
    M_Tag
}
