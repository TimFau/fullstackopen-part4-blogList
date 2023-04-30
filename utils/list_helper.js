const { info } = require('./logger')
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likesArr = blogs.map(x => x.likes)

    const initialValue = 0;
    const returnValue = likesArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
    )
    info(returnValue)
    return returnValue
}

const favoriteBlog = (blogs) => {
    const likesArr = blogs.map(x => x.likes)

    const initialValue = 0;
    const returnValue = blogs.reduce(
        (accumulator, currentValue) => accumulator.likes > currentValue.likes ? accumulator : currentValue
    )
    info(returnValue)
    return returnValue
}

const mostBlogs = (blogs) => {
    const groupByAuthor = _.groupBy(blogs, 'author')
    const authorWithMostBlogs = _.reduce(groupByAuthor, function(accumulator, current) {
        return !accumulator.length ? current :
        current.length > accumulator.length ? current : accumulator
    }, 0)
    const returnValue = {
        author: authorWithMostBlogs[0].author,
        blogs: authorWithMostBlogs.length
    }
    info(returnValue)
    return returnValue
}

const mostLikes = (blogs) => {
    const groupByAuthor = _.groupBy(blogs, 'author')
    const authorWithMostLikes = _.reduce(groupByAuthor, function(accumulator, current) {
        const accumulatorLikes = accumulator ? _.sum(accumulator.map(x => x.likes)) : null
        const currentLikes = _.sum(current.map(x => x.likes))
        return currentLikes > accumulatorLikes ? current : accumulator
    }, 0)
    const authorWithMostLikesName = authorWithMostLikes[0].author
    const authorWithMostLikesTotal = _.sum(authorWithMostLikes.map(x => x.likes))
    const returnValue = {
        author: authorWithMostLikesName,
        likes: authorWithMostLikesTotal
    }
    info(returnValue)
    return returnValue
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}