const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Get all blogs
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

// Get a single blog by ID
blogsRouter.get('/:id', async (request, response) => {
    const id = request.params.id

    try {
        const blog = await Blog.findById(id)
        response.json(blog)
    } catch (error) {
        response.status(400).send(error)
    }
})

// Create a blog
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const token = request.token
    if (!token) {
        return response.status(401).json({ error: 'missing token '})
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'invalid token' })
        }
        const user = await User.findById(decodedToken.id)
        blog.user = user
    } catch (error) {
        return response.status(401).json({ error: 'invalid token' })
    }

    if (!blog.likes) {
        blog.likes = 0
    }

    try {
        const result = await blog.save()
        await User.findByIdAndUpdate(blog.user, { $push: { blogs: result.id } }, { new: true })
        response.status(201).json(result)
    } catch (error) {
        response.status(400).send(error)
    }

})

// Update an existing blog
blogsRouter.post('/:id', async (request, response) => {
    const body = request.body
    const id = request.params.id

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
        response.json(updatedBlog)
    } catch (error) {
        response.status(400).send(error)
    }
})

// Delete a blog
blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    try {
        await Blog.findByIdAndDelete(id)
        response.status(204).end()
    } catch (error) {
        response.status(400).send(error)
    }
})

module.exports = blogsRouter