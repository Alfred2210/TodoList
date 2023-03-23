const mongoose = require('mongoose')

const { Schema } = mongoose

const listSchema = new Schema({
    name: {
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

const List = mongoose.model('List', listSchema)

module.exports = List
