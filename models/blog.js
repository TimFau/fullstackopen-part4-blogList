const mongoose = require('mongoose')
const config = require('./../utils/config')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.mongodbURL
mongoose.connect(mongoUrl)

module.exports = mongoose.model('Blog', blogSchema)