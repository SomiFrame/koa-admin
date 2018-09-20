const mongoose = require('mongoose');
const url = process.env.DB_HOST
const connection = mongoose.createConnection(url);

const M_User = connection.model('user',require('./user'))
const M_Tag = connection.model('tag',require('./tag'))
const M_Video = connection.model('video',require('./video'))

module.exports = {
    M_User,
    M_Tag,
    M_Video
}
