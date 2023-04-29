const { info } = require('./logger')

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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}