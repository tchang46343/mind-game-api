require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const gameRouter = require("./gslides/game-router");
const userRouter = require("./users/users-router");
const authenRouter = require("./authentication/authentication-router");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(express.json());
app.use(helmet());
app.use(cors());
const { CLIENT_ORIGIN } = require("./config");
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use("/gameslides", gameRouter);
app.use("/auth", authenRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});
module.exports = app;
