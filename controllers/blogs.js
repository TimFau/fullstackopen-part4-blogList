const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const id = request.params.id

    try {
        const blog = await Blog.findById(id)
        response.json(blog)
    } catch (error) {
        response.status(400).send(error)
    }
})

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