const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Types = Schema.Types

const S_Video = new Schema({
    title: String,
    createTime: Date,
    description: String,
    tags: [{ type: Types.ObjectId, ref: 'Tag' }]
})
module.exports = S_Vdieo
