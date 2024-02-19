const jwt = require('jsonwebtoken')
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }
  
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      console.log(err, decoded);
      if (err) {
        return res.status(402).json({ error: 'Unauthorized: Invalid token' });
      }
      
      // Attach the decoded token payload to the request for use in subsequent handlers
      if(decoded.customerId)
      req.customerId = decoded.customerId;
    else
    req.restaurantId = decoded.restaurantId

      next();
    });
  };

module.exports={authenticateToken}