const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    }  
]

beforeEach(async() => {
    await Blog.deleteMany({})
    for (let i = 0; i < initialBlogs.length; i += 1) {
        let blogObject = new Blog(initialBlogs[i])
        await blogObject.save()
    }
})

describe('correct number of blogs are returned as JSON', () => {
    test('blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('returns the correct ammount of blogs', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect(response => {
                expect(response.body.length).toEqual(initialBlogs.length)
            })
    })
})

describe('blogs are able to be added and deleted', () => {
    const newBlog = {
        "title": "Integration Test",
        "author": "Tim Fau",
        "url": "http://google.com",
        "likes": 1
    }

    test('blog is able to be added', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(blog => blog.title)

        expect(response.body.length).toEqual(initialBlogs.length + 1)
        expect(titles).toContain('Integration Test')
    })

    test('blog is able to be deleted', async () => {
      const blogToDelete = await Blog.findOne({ title: initialBlogs[0].title })
      const idToDelete = blogToDelete.id
      await api
        .delete(`/api/blogs/${idToDelete}`)
        .expect(204)
      const blogsAfterDeletion = await api.get('/api/blogs')
      expect(blogsAfterDeletion.body.length).toEqual(initialBlogs.length -1)
    })
})

describe('validate fields', () => {
  test('unique identifier is named "id"', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].id).toBeDefined()
  })
  
  test('if likes property is missing, value defaults to 0', async () => {
    const newBlog = {
      "title": "No Likes",
      "author": "Tim Fau",
      "url": "http://google.com"
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect(response => {
        expect(response.body.likes).toEqual(0)
      })
  
  })

  test('if title is missing, backend returns 400', async () => {
    const newBlog = {
      "author": "Guy who doesn't like titles",
      "url": "http://google.com",
      "likes": 4
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('if URL is missing, backend returns 400', async () => {
    const newBlog = {
      "title": "No URL",
      "author": "Tim Fau",
      "likes": 4
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('an individual blog post can be updated', () => {
  const blog = initialBlogs[0]

  test('title can be updated', async () => {
    const newTitle = "New Title"
    const blogToUpdate = await Blog.findOne({ title: blog.title })
    const idToUpdate = blogToUpdate.id

    const updatedBlog = await api
      .post(`/api/blogs/${idToUpdate}`)
      .send( { title: newTitle } )

    expect(updatedBlog.body.title).toEqual(newTitle)
  })

  test('author can be updated', async () => {
    const newAuthor = "Test Man"
    const blogToUpdate = await Blog.findOne({ title: blog.title })
    const idToUpdate = blogToUpdate.id

    const updatedBlog = await api
      .post(`/api/blogs/${idToUpdate}`)
      .send( { author: newAuthor } )

    expect(updatedBlog.body.author).toEqual(newAuthor)
  })

  test('url can be updated', async () => {
    const newURL = "https://google.com/new"
    const blogToUpdate = await Blog.findOne({ title: blog.title })
    const idToUpdate = blogToUpdate.id

    const updatedBlog = await api
      .post(`/api/blogs/${idToUpdate}`)
      .send( { url: newURL } )

    expect(updatedBlog.body.url).toEqual(newURL)
  })

  test('likes can be updated', async () => {
    const newLikes = blog.likes + 5
    const blogToUpdate = await Blog.findOne({ title: blog.title })
    const idToUpdate = blogToUpdate.id

    const updatedBlog = await api
      .post(`/api/blogs/${idToUpdate}`)
      .send( { likes: newLikes } )

    expect(updatedBlog.body.likes).toEqual(newLikes)
  })

})

afterAll(async () => {
    await mongoose.connection.close()
})