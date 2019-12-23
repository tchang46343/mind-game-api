require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL
});

//console.log("knex and driver installed correctly");
// const q1 = knexInstance("mindgame_newuser")
//   .select("*")
//   .toQuery();
// const q2 = knexInstance
//   .from("mindgame_newuser")
//   .select("*")
//   .toQuery();
// console.log("q1:", q1);
// console.log("q2:", q2);
knexInstance
  .from("gameslides")
  .select("*")
  .then(results => {
    console.log(results);
  });
