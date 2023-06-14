const mongoose = require('mongoose')
const config = require('./../utils/config')

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: [true, "This is a required field." ],
        minLength: [3, 'Username must be at least 3 characters long'],
        unique: true
    },
    password: { 
        type: String,
        required: [true, "This is a required field." ],
        minLength: [3, 'Password must be at least 3 characters long'],
    },
    name: { type: String, required: [true, "Name is a required field." ]},
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.password
        delete returnedObject.__v
    }
})

const User = mongoose.model('User', userSchema)

const mongoUrl = config.mongodbURL
mongoose.connect(mongoUrl)

module.exports = mongoose.model('User', userSchema)