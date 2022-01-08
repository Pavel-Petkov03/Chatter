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


// we will assign validators object to req 
function authenticateEntries(req , res , next) {
    [...Object.entries(req.validators)].forEach(([ k , v]) => {
        try{
            if( typeof v === "function"){
                v(req.body[k])
            }
        }catch(er){
            return res.status(er.status).json({
                errorMessage : er.message
            })
        }
    })
    next()
}

export {
    verifyToken,
    authenticateEntries
}