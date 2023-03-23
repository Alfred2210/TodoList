const express = require('express')
require('dotenv').config()
require('./db')
const userRouter = require('./router/user.router')
const listRouter = require('./router/list.router')
const todoRouter = require('./router/todo.router')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', userRouter)
app.use('/lists', listRouter)
app.use('/todos', todoRouter)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
