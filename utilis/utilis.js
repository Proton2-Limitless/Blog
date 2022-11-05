const CalculateReadingTime = async (body) => {
    const bodylength = body.split(" ").length
    // console.log(bodylength)
    const ReadTimeConstant = 200
    const time = bodylength / ReadTimeConstant
    const min = Math.floor(time)
    const seconds = Math.ceil((time - min) * 60)
    const reading_time = `${min} minutes ${seconds} seconds`

    return reading_time
}

module.exports = { CalculateReadingTime}