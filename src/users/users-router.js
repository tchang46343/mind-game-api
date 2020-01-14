const express = require("express");
const xss = require("xss");
const userControls = require("./users-controls");

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
            error: { message: `User not found.` }
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
