const bcrypt = require("bcryptjs");

const newUsers = {
  getAllUsers(knex) {
    return knex.select("*").from("users");
  },
  insertUser(knex, newUserSetup) {
    return knex
      .insert(newUserSetup)
      .into("users")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex
      .from("users")
      .select("*")
      .where("id", id)
      .first();
  },
  deleteUser(knex, id) {
    return knex("users")
      .where({ id })
      .delete();
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12);
  }
};

module.exports = newUsers;
