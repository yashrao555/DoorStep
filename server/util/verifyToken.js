const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  jwt.verify(token, "your_secret_key", (err, decoded) => {
    console.log(err,"the decoded is", decoded);
    if (err) {
      return res.status(402).json({ error: "Unauthorized: Invalid token" });
    }

    // Attach the decoded token payload to the request for use in subsequent handlers
    if (decoded.customerId) req.customerId = decoded.customerId;
    else if (decoded.restaurantId) req.restaurantId = decoded.restaurantId;
    else if(decoded.staffId) {
      req.staffId = decoded.staffId 
      req.restaurantId=decoded.restaurant_Id
      console.log(req.staffId);
      console.log(req.restaurant_Id);
    }
    next();
  });
};

module.exports = { authenticateToken };
