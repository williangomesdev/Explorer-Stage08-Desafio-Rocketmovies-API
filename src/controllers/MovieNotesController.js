const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class MovieNotesController {
  async createMovieNotes(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

    if (!title) {
      throw new AppError("Título do filme é obrigatório!");
    }
    if (!description) {
      throw new AppError("Descrição do filme é obrigatório!");
    }
    if (!rating) {
      throw new AppError("Nota do filme é obrigatório!");
    } else if (rating > 5) {
      throw new AppError("Nota inválida, por favor insira notas entre 1 e 5!");
    }

    const movie_id = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsInsert = tags.map((name) => {
      return {
        movie_id,
        name,
        user_id,
      };
    });

    await knex("movie_tags").insert(tagsInsert);

    response.json();
  }

  async showMovieNotes(request, response) {
    const { id } = request.params;

    const noteMovie = await knex("movie_notes").where({ id }).first();
    const tagMovie = await knex("movie_tags")
      .where({ movie_id: id })
      .orderBy("name");

    return response.json({
      ...noteMovie,
      tagMovie,
    });
  }

  async deleteMovieNotes(request, response) {
    const { id } = request.params;

    await knex("movie_notes").where({ id }).delete();

    return response.json();
  }
}

module.exports = MovieNotesController;
