const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
    {
        "username": "tdog",
        "name": "Tim Fau",
        "password": "123"
    },
    {
        "username": "Testman",
        "name": "Test Man",
        "password": "1234"
    },
    {
        "username": "rainMan",
        "name": "Test Again",
        "password": "12345"
    }
]

beforeEach(async() => {
    await User.deleteMany({})
    for (let i = 0; i < initialUsers.length; i += 1) {
        let userObject = new User(initialUsers[i])
        await userObject.save()
    }
})

describe('correct number of users are returned as JSON', () => {
    test('users are returned as JSON', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('returns the correct ammount of users', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect(response => {
                expect(response.body.length).toEqual(initialUsers.length)
            })
    })
})

describe('users are able to be added and deleted', () => {
    const newUsername = "newUserman"
    const newUser = {
        "username": newUsername,
        "password": "1234567",
        "name": "New Userman"
    }

    test('user is able to be added', async () => {
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')
        const usernames = response.body.map(user => user.username)

        expect(response.body.length).toEqual(initialUsers.length + 1)
        expect(usernames).toContain(newUsername)
    })

    test('user is able to be deleted', async () => {
      const userToDelete = await User.findOne({ username: initialUsers[0].username })
      const idToDelete = userToDelete.id
      await api
        .delete(`/api/users/${idToDelete}`)
        .expect(204)
      const usersAfterDeletion = await api.get('/api/users')
      expect(usersAfterDeletion.body.length).toEqual(initialUsers.length -1)
    })
})

describe('validate fields for creating user', () => {
    test('unique identifier is named "id"', async () => {
      const response = await api.get('/api/users')
    
      expect(response.body[0].id).toBeDefined()
    })
  
    test('if username is missing, backend returns 400', async () => {
      const newUser = {
        "name": "Tim Fau",
        "password": "123"
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  
    test('if password is missing, backend returns 400', async () => {
      const newUser = {
        "username": "testMan2",
        "name": "Tim Fau"
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })
  })
  
  describe('validate user updates', () => {
    const user = initialUsers[0]
  
    test('username cannot be updated', async () => {
      const newUsername = "coolNewUsername"
      const userToUpdate = await User.findOne({ username: user.username })
      const idToUpdate = userToUpdate.id
  
      const updatedUser = await api
        .post(`/api/users/${idToUpdate}`)
        .send( { username: newUsername } )
        .expect(400)
    })
  
    test('name can be updated', async () => {
      const newName = "Cool New Name"
      const userToUpdate = await User.findOne({ username: user.username })
      const idToUpdate = userToUpdate.id
  
      const updatedUser = await api
        .post(`/api/users/${idToUpdate}`)
        .send( { name: newName } )
  
      expect(updatedUser.body.name).toEqual(newName)
    })

    test('password can be updated', async () => {
        // Note: Only validates that a valid response is received. Does not check that the new password is equal to the one provided.
        const newPassword = "coolNewP@ssword"
        const userToUpdate = await User.findOne({ username: user.username })
        const idToUpdate = userToUpdate.id
    
        const updatedUser = await api
          .post(`/api/users/${idToUpdate}`)
          .send( { password: newPassword } )
          .expect(200)
    })
  
  })
  
  afterAll(async () => {
      await mongoose.connection.close()
  })