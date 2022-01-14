const jwt = require('jsonwebtoken');

// this function will validate tokens in backend
function verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({
          errorMessage: 'Your token is not valid. Login or register first.',
        });
      }
  
      req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
      return res.status(401).json({
        errorMessage: 'Your token is not valid.',
        data: error,
      });
    }
    next();
}


// we will assign validators array to req 
function authenticateEntries(req , res , next) {
    req.validators.forEach((v) => {
        try{
            if( typeof v === "function"){
                // the params to the functions will be assigned in previous middleware
                v()
            }
        }catch(er){
            return res.status(er.status).json({
                errorMessage : er.message
            })
        }
    })
    next()
}

module.exports =  {
    verifyToken,
    authenticateEntries
}