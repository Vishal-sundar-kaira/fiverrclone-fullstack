
const jwt=require("jsonwebtoken")
exports.verifytoken = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("You are not authenticated");
  
    try {
      const payload = await jwt.verify(token, process.env.JWT_KEY);
      req.userId = payload.id;
      req.isSeller = payload.isSeller;
      next();
    } catch (err) {
      return res.status(403).send("Token is not valid");
    }
  };