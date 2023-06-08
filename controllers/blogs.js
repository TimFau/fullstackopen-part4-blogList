const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// Get all blogs
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
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

    if (!blog.likes) {
        blog.likes = 0
    }

    try {
        const result = await blog.save() 
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