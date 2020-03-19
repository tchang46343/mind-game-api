module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://enybafyxnmjytr:f1b7c0332259b0ed0f0e30c706393cb0f3fc67c5f4842cdc97b37586ffba924c@ec2-35-172-85-250.compute-1.amazonaws.com:5432/dfh9m45h8hun9b",
  //"postgresql://tchang@localhost/mindgame_gameslides",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: "3 days"
};
