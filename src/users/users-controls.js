const newUsers = {
  getAllUsers(knex) {
    return knex.select("*").from("users");
  },
  insertSlides(knex, user) {
    return knex
      .insert(user)
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
  deleteSlide(knex, id) {
    return knex("users")
      .where({ id })
      .delete();
  }
};

module.exports = newUsers;
