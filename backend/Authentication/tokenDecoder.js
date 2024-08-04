const jwt = require('jsonwebtoken');

const tokenDecoder = (req , res) => {

    try{

        let {token} = req.body;
        if(!token){
            return res.status(404).json({
                message: 'Token not found'
            })
        }

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
        console.log(err);
    }

}

module.exports = tokenDecoder;