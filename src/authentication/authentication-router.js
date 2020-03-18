const express = require("express");
const AuthenService = require("./authentication-service");

const authenRouter = express.Router();

authenRouter.post("/login", (req, res, next) => {
  const knex = req.app.get("db");

  const { email, password } = req.body;
  const user = { email, password };

  console.log(user);

  for (const [key, value] of Object.entries(user)) {
    if (value === null) {
      return res.status(400).json({
        error: `Missing ${key} in request`
      });
    }
  }

  let dbUser;
  AuthenService.getUserByUserCredential(knex, email)
    .then(dbUser => {
      if (!dbUser) {
        return res.status(400).json({
          error: `Email does not exist`
        });
      }

      AuthenService.comparePassword(user.password, dbUser.password)
        .then(passwordsMatch => {
          if (!passwordsMatch) {
            return res.status(400).json({
              error: `Please try to enter password again`
            });
          }
          res.send({
            authToken: AuthenService.createJWT(dbUser.email, {
              email_id: dbUser.id
            })
          });
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = authenRouter;
