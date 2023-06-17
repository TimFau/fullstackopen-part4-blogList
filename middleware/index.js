const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('bearer ')) {
        const token = authorization.replace('bearer ', '')
        request.token = token
    }

    next()
}

module.exports = {
    tokenExtractor
}
