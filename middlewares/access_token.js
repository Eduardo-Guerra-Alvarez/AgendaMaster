const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    // get token
    const token = req.headers.authorization.replace('Bearer ', '')
    console.log(token)

    if(!token) {
        return res.status(401).json({ message: 'Access denied, token missing.' })
    }

    // verify if token is equal to secret key
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({ message: 'Invalid Token.' })
        }
        req.user = decoded
        next()
    })

}

module.exports = verifyToken
