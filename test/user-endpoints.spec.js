const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeUsersArray } = require("./users.fixtures");

describe.only("User Endpoints", function() {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
  });
  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db("users").truncate());

  afterEach("cleanup", () => db("users").truncate());

  describe("GET /users", () => {
    context(`Given no users`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/users")
          .expect(200, []);
      });
    });

    context("Given there are users in the database", () => {
      const testUsers = makeUsersArray();

      beforeEach("insert user", () => {
        return db.into("users").insert(testUsers);
      });

      it("GET /users respond with 200 and all of the users", () => {
        return supertest(app)
          .get("/users")
          .expect(200, testUsers);
      });
    });
  });

  describe("GET /users/:userId", () => {
    context(`Given no users`, () => {
      it(`responds with 404`, () => {
        const userId = 123456;
        return supertest(app)
          .get(`/users/${userId}`)
          .expect(404, { error: { message: `User not found.` } });
      });
    });

    context("Given there are users in the database", () => {
      const testUsers = makeUsersArray();

      beforeEach("insert user", () => {
        return db.into("users").insert(testUsers);
      });
      it("GET /users/:user_id respond with 200 and the specified user", () => {
        const userId = 1;
        const expectedUser = testUsers[userId - 1];
        return supertest(app)
          .get(`/users/${userId}`)
          .expect(200, expectedUser);
      });
    });
  });
});
