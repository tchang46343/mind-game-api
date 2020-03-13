require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL
});

knexInstance
  .from("gameslides")
  .select("*")
  .then(results => {
    console.log(results);
  });
