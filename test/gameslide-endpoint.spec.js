const knex = require("knex");
const app = require("../src/app");
const { makeGameSlideArray } = require("./gameslide.fixtures");

describe.only("Game slide Endpoints", function() {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
  });
  after("disconnect from db", () => db.destroy());
  before("clean the table", () => db("gameslides").truncate());
  context("Given there are game slides in the database", () => {
    const gameslidestest = makeGameSlideArray;
    beforeEach("insert gameslide", () => {
      return db.into("gameslides").insert(gameslidestest);
    });

    it("GET /slides responds with 200 and all of the slides", () => {
      return supertest(app)
        .get("/")
        .expect(response => {});
    });

    it("GET /:gameslide_id responds with 200 and the specified article", () => {
      const gameslideId = 2;
      const expectedgameslide = gameslidestest[gameslideId - 1];
      return supertest(app)
        .get(`/articles/${gameslideId}`)
        .expect(200, expectedgameslide);
    });
  });
});
