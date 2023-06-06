const mongoose = require('mongoose')
const config = require('./../utils/config')

const blogSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Title is a required field."] },
    author: String,
    url: { type: String, required: [true, "URL is a required field."] },
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