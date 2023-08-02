const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware')

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
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const blog = new Blog(request.body),
          { token, user } = request

    if (!token) return response.status(401).json({ error: 'missing token '})
    if (!user) return response.status(401).json({ error: 'invalid token' })
    if (!blog.likes) { blog.likes = 0 }

    try {
        blog.user = user.id
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
        user: body.user,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
        if (!updatedBlog) return response.status(404).send({ error: 'blog with that ID not found'})
        response.json(updatedBlog)
    } catch (error) {
        response.status(400).send(error)
    }
})

// Delete a blog
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const id = request.params.id,
          { token, user } = request,
          blog = await Blog.findById(id)
    let isUsersBlog = false

    if (!token) return response.status(401).json({ error: 'missing token '})
    if (!blog) return response.status(401).json({ error: 'blog with that ID not found' })
    if (!user) return response.status(401).json({ error: 'invalid token' })

    try {
        const userId = user.id.toString(),
              blogOwnerId = blog.user.toString()
        isUsersBlog = blogOwnerId === userId

        if (isUsersBlog) {
            await Blog.findByIdAndDelete(id)
            response.status(204).end()
        } else {
            return response.status(401).json({ error: 'unable to delete blog of another user' })
        }
    } catch (error) {
        response.status(400).send(error)
    }
})

module.exports = blogsRouter