module.exports = async (req, res, next) => {
    // If no user is logged in, don't proceed
    if (req.user) next()
    else res.status(400).send(`You don't have permission to do this`)
}