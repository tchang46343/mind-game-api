const express = require("express");
const GameSlides = require("./game-slides");

const gameslideRouter = express.Router();

const slideparams = gameslide => ({
  id: gameslide.id,
  word: gameslide.word,
  quote: gameslide.quote,
  imageurl: gameslide.imageurl
});

gameslideRouter.route("/gameslides").get((req, res, next) => {
  GameSlides.getAllSlides(req.app.get("db"))
    .then(slides => {
      res.json(slides);
    })
    .catch(next);
});

gameslideRouter.route("/gameslides/:gameslide_id").get((req, res, next) => {
  GameSlides.getById(req.app.get("db"), req.params.gameslide_id)
    .then(slides => {
      if (!slides) {
        return res.status(404).json({
          error: { message: `Game slide not found.` }
        });
      }
      res.json(slideparams(slides));
    })
    .catch(next);
});

module.exports = gameslideRouter;
