const mongoose = require('mongoose')

const { Schema } = mongoose

const todoSchema = new Schema({
    listId: {
        type: Schema.Types.ObjectId,
        ref: 'List',
        required: true,
    },
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
