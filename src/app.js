require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
// const GameSlides = require("./gslides/game-slides");
// const uuid = require("uuid/v4");
const gameRouter = require("./gslides/game-router");

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

// app.use(function validateBearerToken(req, res, next) {
//   const apiToken = process.env.API_TOKEN;
//   const authToken = req.get("Authorization");
//   if (!authToken || authToken.split(" ")[1] !== apiToken) {
//     return res.status(401).json({ error: "Unauthorized request" });
//   }
//   next();
// });
app.use(gameRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/", (req, res, next) => {
//   const knexInstance = req.app.get("db");
//   GameSlides.getAllSlides(knexInstance)
//     .then(slides => {
//       res.json(slides);
//     })
//     .catch(next);
// });

// app.get("/:gameslide_id", (req, res, next) => {
//   const knexInstance = req.app.get("db");
//   GameSlides.getById(knexInstance, req.params.gameslide_id)
//     .then(slides => {
//       res.json(slides);
//     })
//     .catch(next);
// });

app.get("/newuser", (req, res) => {
  res.json(users);
});

const users = [
  {
    id: "3c8da4d5-1597-46e7-baa1-e402aed70d80",
    firstName: "sally",
    lastName: "Student",
    email: "SallyStudent@gmail.com",
    password: "password"
  }
];

app.post("/newuser", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const emailSyntax1 = "@";
  const emailSyntax2 = ".com";

  if (!firstName) {
    return res.status(400).send("First Name required for account setup!");
  }
  if (!lastName) {
    return res.status(400).send("Last Name required for account setup!");
  }

  if (!email) {
    return res.status(400).send("Email required for account setup!");
  }
  if (!password) {
    return res.status(400).send("Password required for account setup!");
  }

  if (firstName.length < 3 || firstName.length > 20) {
    return res
      .status(400)
      .send("First name must be between than 3 and 20 letters");
  }

  if (lastName.length < 3 || firstName.length > 20) {
    return res.status(400).send("Last name must be between 3 and 20 letters");
  }

  if (!email.includes(emailSyntax1)) {
    return res.status(400).send("Email must have character @.");
  }
  if (!email.includes(emailSyntax2)) {
    return res.status(400).send("Email must have character .com");
  }

  if (password.length < 8 || password.length > 36) {
    return res.status(400).send("Password must be between 8 and 36 characters");
  }

  if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    return res.status(400).send("Password must be contain at least one digit");
  }

  const id = uuid();
  const newUser = {
    id,
    firstName,
    lastName,
    email,
    password
  };

  users.push(newUser);
  res
    .status(201)
    .location(`http://localhost:8000/newuser/${id}`)
    .json(newUser);
  //.json({ id: id });
});

app.delete("/newuser:userId", (req, res) => {
  const userId = req.params;
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) {
    return res.status(404).send("User not found");
  }

  users.splice(index, 1);
  res.send("Deleted");
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
