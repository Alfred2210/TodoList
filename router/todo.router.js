const router = require('express').Router()
const authorization = require('../middlewares/authorization.mid')
const Todo = require('../models/todo.model')

router.get('/:listId', authorization, async (req, res) => {
    try {
        const todos = await Todo.find({ listId: req.params.listId })
        res.send(todos)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.post('/:listId', authorization, async (req, res) => {
    try {
        const todo = new Todo({
            name: req.body.name,
            date: new Date(),
            listId: req.params.listId,
        })

        await todo.save()
        return res.status(201).send(todo)
    } catch (err) {
        return res.status(500).send(err)
    }
})
router.put('/:listId/:todoId', authorization, async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.todoId, listId: req.params.listId },
            req.body,
            { new: true }
        )
        if (!todo) {
            return res.status(404).send('Todo not found')
        }
        res.send(todo)
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.patch('/:listId/:todoId', authorization, async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.todoId, listId: req.params.listId },
            req.body,
            { new: true }
        )
        if (!todo) {
            return res.status(404).send('Todo not found')
        }
        res.send(todo)
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.delete('/:listId/:todoId', authorization, async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.todoId,
            listId: req.params.listId,
        })
        if (!todo) {
            return res.status(404).send('Todo not found')
        }
        res.send(todo)
    } catch (err) {
        return res.status(500).send(err)
    }
})

module.exports = router
