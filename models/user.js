const mongoose = require('mongoose')
const config = require('./../utils/config')

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Username is a required field." ], unique: true},
    password: { type: String, required: [true, "Password is a required field." ]},
    name: { type: String, required: [true, "Name is a required field." ]}
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