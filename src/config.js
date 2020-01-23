module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL:
    process.env.DB_URL || "postgresql://tchang@localhost/mindgame_gameslides",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: "3 days"
};
