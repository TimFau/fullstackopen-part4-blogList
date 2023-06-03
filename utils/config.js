require('dotenv').config()

const mongodbURL = process.env.NODE_ENV === 'test' ? process.env.test_mongodbURL : process.env.mongodbURL
const PORT = 3003

module.exports = {
    mongodbURL,
    PORT
}