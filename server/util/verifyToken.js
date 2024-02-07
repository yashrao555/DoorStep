const jwt = require('jsonwebtoken')
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }
  
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
  
      // Attach the decoded token payload to the request for use in subsequent handlers
      req.customerId = decoded.customerId;
      next();
    });
  };

module.exports={authenticateToken}