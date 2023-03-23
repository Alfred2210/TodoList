const express = require('express')

const router = express.Router()
const User = require('../models/user.model')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).send('User not found')
        }

        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        if (!user) return res.status(404).send('User not found')
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
        })
        if (!user) return res.status(404).send('User not found')
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId)
        if (!user) return res.status(404).send('User not found')
        res.send(user)
    } catch (err) {
        return res.status(500).send(err)
    }
})
module.exports = router
