const jwt = require('jsonwebtoken');

const config = process.env

const verifyToken = (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if(!token){
        return res.status(403).json({
            message: 'Token not found'
        })
    }

    try{
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;

        jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
              console.error('Failed to verify token:', err);
              return res.status(400).json({
                message: 'Invalid token'
              })
            }
            return res.status(200).json({
                userData: decoded
              })
          });
          
    } catch(err){
        return res.status(401).json({
            message: 'Invalid Token'
        })
    }

    
}

module.exports = verifyToken;