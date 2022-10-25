module.exports = (req,res,next) => {
    if (req.cookies.helloCookie) {
        req.session.user = req.cookies.helloCookie
    }
    next()
}