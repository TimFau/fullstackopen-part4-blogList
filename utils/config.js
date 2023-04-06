require('dotenv').config()

const mongodbURL = process.env.mongodbURL
const PORT = 3003

module.exports = {
    mongodbURL,
    PORT
}