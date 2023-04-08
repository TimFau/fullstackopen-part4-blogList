const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likesArr = blogs.map(x => x.likes)

    const initialValue = 0;
    return likesArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
    )
}

module.exports = {
    dummy,
    totalLikes
}