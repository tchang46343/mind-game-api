const express = require("express");
const xss = require("xss");
const userControls = require("./users-controls");
const { requireAuth } = require("../middleware/jwt-auth");
const AuthenService = require("../authentication/authentication-service");
const path = require("path");

const userRouter = express.Router();
const jsonParser = express.json();

const serializeuserParams = user => ({
  id: user.id,
  firstname: user.firstname,
  lastname: user.lastname,
  email: xss(user.email),
  password: xss(user.password)
});

userRouter
  .route("/users")

  .post((req, res, next) => {
    const knex = req.app.get("db");

    const { email, password } = req.body;

    for (const key of ["email", "password"]) {
      if (!req.body[key]) {
        return res.status(400).json({
          error: `Missing ${key} in request body`
        });
      }
    }

    AuthenService.getUserByUserCredential(knex, username)
      .then(user => {
        if (user) {
          return res.status(400).json({
            error: `Email already taken`
          });
        }

        UsersControls.hashPassword(password)
          .then(hashedPassword => {
            const user = {
              email,
              password: hashedPassword
            };
            return UsersControls.insertUser(knex, user);
          })
          .then(user => {
            return res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${email.id}`))
              .json(serializeUser(user));
          })
          .catch(next);
      })
      .catch(next);
  });

usersRouter
  .route("/:id")
  .get((req, res, next) => {
    const knex = req.app.get("db");

    UsersService.getUserById(knex, req.params.id).then(user => {
      if (!user) {
        return res.status(404).json({
          error: `User not found`
        });
      }

      return res.json(serializeUser(user));
    });
  })

  // module.exports = usersRouter;

  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    userControls
      .getAllUsers(knexInstance)
      .then(users => {
        res.json(users.map(serializeuserParams));
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    const newUserSetup = { firstname, lastname, email, password };

    for (const [key, value] of Object.entries(newUserSetup))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });

    userControls
      .insertUser(req.app.get("db"), newUserSetup)
      .then(user => {
        res
          .status(201)
          .location(`/users/${user.id}`)
          .json(serializeuserParams(user));
      })
      .catch(next);
  });

userRouter
  .route("/users/:user_id")
  .all((req, res, next) => {
    const knexInstance = req.app.get("db");
    userControls
      .getById(knexInstance, req.params.user_id)
      .then(users => {
        if (!users) {
          return res.status(404).json({
            error: { message: `User doesn't exist.` }
          });
        }
        res.users = users;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeuserParams(res.users));
  })
  .delete((req, res, next) => {
    userControls
      .deleteUser(req.app.get("db"), req.params.user_id)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = userRouter;

///ask ali on how to renumber id once data is deleted
