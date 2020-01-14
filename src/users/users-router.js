const express = require("express");
const userControls = require("./users-controls");

const userRouter = express.Router();

const userParams = user => ({
  id: user.id,
  firstname: user.firstname,
  lastname: user.lastname,
  email: user.email,
  password: user.password
});

userRouter.route("/users").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  userControls
    .getAllUsers(knexInstance)
    .then(users => {
      res.json(users);
    })
    .catch(next);
});

userRouter.route("/users/:user_id").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  userControls
    .getById(knexInstance, req.params.user_id)
    .then(users => {
      if (!users) {
        return res.status(404).json({
          error: { message: `User not found.` }
        });
      }
      res.json(userParams(users));
    })
    .catch(next);
});

module.exports = userRouter;
