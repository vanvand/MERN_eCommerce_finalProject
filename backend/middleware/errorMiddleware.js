// CUSTOM ERROR HANDLING

// if you enter route which does not exist e.g. /api/test THEN through Error message with entered url
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

// handle error statusCodes and show readable message instead of HTML doc
const errorHandler = (err, req, res, next) => {
    // check status code > sometime you get 200 statusCode although it is an error >> so if 200 then transform to 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    })
}

export { notFound, errorHandler}