const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const User = require('./models/user');
const usersRouter = require('./controllers/users')

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app