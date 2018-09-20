const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Types = Schema.Types

const S_Video = new Schema({
    title: String,
    createdOn:{
        type: Date,
        default: new Date()
    },
    description: String,
    tags: [{ type: Types.ObjectId, ref: 'tag' }],
    image: {
        type: Types.Mixed
    }
})
module.exports = S_Video
