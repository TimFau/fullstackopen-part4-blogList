const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('bearer ')) {
        const token = authorization.replace('bearer ', '')
        request.token = token
    }

    next()
}

const jwt = require('jsonwebtoken')

const userExtractor = (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        request.user = decodedToken
    } catch {}

    next()
}

module.exports = {
    tokenExtractor,
    userExtractor
}
