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
  }

  //add hash password (Server)

  //after login have the server create the token save for the current user session (Client/Server)
  //after token receive save the token in the window object (Client/Server)
  //Logout will need to empty out the window object (Client)
  //login update state to active user and logout update state to remove user (Client)
};

module.exports = newUsers;
