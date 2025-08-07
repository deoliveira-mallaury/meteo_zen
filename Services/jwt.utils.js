const jwt = require("jsonwebtoken");
function generateConfirmToken(email) {
  const payload = {
    email,
    action: "confirm_email",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  return token;
}
module.exports = { generateConfirmToken };
