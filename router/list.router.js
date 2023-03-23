const express = require('express')

const router = express.Router()
const User = require('../models/user.model')
const List = require('../models/list.model')

router.get('/:userId', async (req, res) => {
    try {
        const lists = await List.find({ user: req.user._id })
        res.send(lists)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.get('/:userId/:listId', async (req, res) => {
    try {
        const list = await List.findOne({
            _id: req.params.listId,
            user: req.params.userId,
        })
        if (!list) return res.status(404).send('List not found')
        return res.send(list)
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.post('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) return res.status(404).send('User not found')

        const list = new List({
            name: req.body.name,
            user: req.params.userId,
        })

        await list.save()
        return res.status(201).send(list)
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.put('/:userId/:listId', async (req, res) => {
    try {
        const list = await List.findOneAndUpdate(
            { _id: req.params.listId, user: req.params.userId },
            req.body,
            { new: true }
        )
        if (!list) return res.status(404).send('List not found')
        res.send(list)
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.delete('/:userId/:listId', async (req, res) => {
    try {
        const list = await List.findOneAndDelete({
            _id: req.params.listId,
            user: req.params.userId,
        })
        if (!list) return res.status(404).send('List not found')
        res.send(list)
    } catch (err) {
        return res.status(500).send(err)
    }
})

module.exports = router
