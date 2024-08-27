module.exports = (error, req, res, next) => {
    if (error) res.status(res.statusCode || 500).send(error.message || 'Unknown error occurred on server')
    next()
}