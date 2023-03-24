const mongoose = require('mongoose')

const { Schema } = mongoose

const todoSchema = new Schema({
    name: {
        type: String,
    },
    date: {
        type: Date,
    },
    listId: {
        type: Schema.Types.ObjectId,
        ref: 'List',
        required: true,
    },
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
