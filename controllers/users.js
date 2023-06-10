const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Get all users
usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

// Get a single user by ID
// usersRouter.get('/:id', async (request, response) => {
//     const id = request.params.id

//     try {
//         const user = await User.findById(id)
//         response.json(user)
//     } catch (error) {
//         response.status(400).send(error)
//     }
// })

// Create a user
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10; // TODO: readup on what this means
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        password: passwordHash
    })

    try {
        const savedUser = await user.save() 
        response.status(201).json(savedUser)
    } catch (error) {
        response.status(400).send(error)
    }

})

// Update an existing user
// usersRouter.post('/:id', async (request, response) => {
//     const body = request.body
//     const id = request.params.id

//     const user = {
//         title: body.title,
//         author: body.author,
//         url: body.url,
//         likes: body.likes
//     }

//     try {
//         const updatedUser = await User.findByIdAndUpdate(id, user, { new: true })
//         response.json(updatedUser)
//     } catch (error) {
//         response.status(400).send(error)
//     }
// })

// Delete a user
// usersRouter.delete('/:id', async (request, response) => {
//     const id = request.params.id

//     try {
//         await User.findByIdAndDelete(id)
//         response.status(204).end()
//     } catch (error) {
//         response.status(400).send(error)
//     }
// })

module.exports = usersRouter