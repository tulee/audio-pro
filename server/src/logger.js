const myLog = (req, res, next) =>{
    console.log(req.headers);
    next()
}

module.exports = myLog