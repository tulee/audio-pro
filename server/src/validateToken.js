const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) =>{
    const { authorization } = req.headers;
    if (!authorization || authorization == "") {
        res.status(403).send({message:"UnAuthorized"});
        return
    }else{
        try {
            const token = authorization.split(" ")[1];
            const decoded = jwt.verify(token, "ahihi18071995");
            if (decoded) {
                next();
            }
        } catch (err) {
            res.status(401).send({message:"Invalid Token"});
        }  
    }
}

module.exports = validateToken