const GameSlides = {
  getAllSlides(knex) {
    return knex.select("*").from("gameslides");
  },
  insertSlides(knex, newSlide) {
    return knex
      .insert(newSlide)
      .into("gameslides")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  getById(knex, id) {
    return knex
      .from("gameslides")
      .select("*")
      .where("id", id)
      .first();
  },
  deleteSlide(knex, id) {
    return knex("gameslides")
      .where({ id })
      .delete();
  },
  updateSlide(knex, id, newSlideContent) {
    return knex("gameslides")
      .where({ id })
      .update(newSlideContent);
  }
};

module.exports = GameSlides;
