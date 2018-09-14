const mongoose = require('mongoose')
const Schema = mongoose.Schema
const S_Tag = new Schema({
    name: String,
    createTime: Date,
    updated:{
        type: Date,
        default: Date.now
    }
})
module.exports=S_Tag
