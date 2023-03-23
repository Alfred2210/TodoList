const express = require('express')

const router = express.Router()
const User = require('../models/user.model')

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.send(users)
    })
})

router.get('/:userId', (req, res) => {
    User.findById(req.params.userId, (err, user) => {
        if (err) {
            return res.status(500).send(err)
        }
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.send(user)
    })
})

router.post('/', (req, res) => {
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(201).send(user);
    });
})

router.put('/:userId', (req, res) => {
    User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true },
        (err, user) => {
            if (err) return res.status(500).send(err)
            res.send(user)
        }
    )
})

module.exports = router
