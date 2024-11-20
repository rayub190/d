import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Extract the token part after "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "yourSecretKey");
    req.user = decoded; // Attach decoded user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
