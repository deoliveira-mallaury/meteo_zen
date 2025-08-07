// auth.middleware.js
import jwt from "jsonwebtoken";

export function protect(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant." });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.error(e.message);
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
}
export function getSession(req,res,next) {
    
}