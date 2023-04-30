const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
      _id: '642e106357d4af8d36819c6d',
      title: 'Test Blog Post 1',
      author: 'Tim Fau',
      url: 'https://Google.com',
      likes: 5
  }
]

const listWithSixBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const listWithTenBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fd",
    title: "css-tricks",
    author: "Chris Coyier",
    url: "https://css-tricks.com/",
    likes: 32,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fe",
    title: "Smashing Magazine",
    author: "Robert C. Martin",
    url: "https://www.smashingmagazine.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17ff",
    title: "David Walsh",
    author: "David Walsh",
    url: "https://davidwalsh.name/",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fg",
    title: "John Resig",
    author: "John Resig",
    url: "https://johnresig.com/",
    likes: 2,
    __v: 0
  },
]

test('dummy return one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('when list has only one blog', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has multiple blogs', () => {
        const result = listHelper.totalLikes(listWithSixBlogs)
        expect(result).toBe(36)
    })

})

describe('favorite blog', () => {

  test('when list has only ony blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(
      {
        _id: '642e106357d4af8d36819c6d',
        title: 'Test Blog Post 1',
        author: 'Tim Fau',
        url: 'https://Google.com',
        likes: 5
      }
    )
  })

  test('when list has multiple blogs 1', () => {
    const result = listHelper.favoriteBlog(listWithSixBlogs)
    expect(result).toEqual(
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      }
    )
  })

  test('when list has multiple blogs 2', () => {
    const result = listHelper.favoriteBlog(listWithTenBlogs)
    expect(result).toEqual(
      {
        _id: "5a422bc61b54a676234d17fd",
        title: "css-tricks",
        author: "Chris Coyier",
        url: "https://css-tricks.com/",
        likes: 32,
        __v: 0
      }
    )
  })

})

describe('most blogs', () => {
  test('when list has one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(
      { author: 'Tim Fau', blogs: 1 }
    )
  })

  test('when list has multiple blogs 1', () => {
    const result = listHelper.mostBlogs(listWithSixBlogs)
    expect(result).toEqual(
      { author: 'Robert C. Martin', blogs: 3 }
    )
  })

  test('when list has multiple blogs 2', () => {
    const result = listHelper.mostBlogs(listWithTenBlogs)
    expect(result).toEqual(
      { author: 'Robert C. Martin', blogs: 4 }
    )
  })
})