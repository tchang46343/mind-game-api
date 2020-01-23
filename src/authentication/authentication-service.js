const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = require("../config");

const AuthenService = {
  getUserByUserCredential(knex, email) {
    return knex
      .from("users")
      .select("*")
      .where("email", email)
      .first();
  },
  comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  },
  createJWT(subject, payload) {
    return jwt.sign(payload, JWT_SECRET, {
      subject,
      expiresIn: JWT_EXPIRY,
      algorithm: "HS256"
    });
  },
  verifyJWT(token) {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"]
    });
  },
  parseBasicToken(token) {
    return Buffer.from(token, "base64")
      .toString()
      .split(":");
  }
};

module.exports = AuthenService;
