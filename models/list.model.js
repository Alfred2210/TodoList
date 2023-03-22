const mongoose = require('mongoose')

const { Schema } = mongoose

const listSchema = new Schema({
    User: {
        type: String,
        required: true,
    },
})

const User = mongoose.model('List', listSchema)

module.exports = User
