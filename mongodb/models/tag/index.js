const mongoose = require('mongoose')
const Schema = mongoose.Schema
const S_Tag = new Schema({
    name: String,
    createdOn: {
        type: Date,
        default: Date.now
    },
    updated:{
        type: Date
    }
})
module.exports=S_Tag
