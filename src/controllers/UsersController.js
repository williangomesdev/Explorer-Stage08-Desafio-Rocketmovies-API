const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UsersController {
  async createUser(request, response) {
    const { name, email, password, avatar } = request.body;

    if (!name) {
      throw new AppError("Nome é obrigatório!");
    }
    if (!email) {
      throw new AppError("Email é obrigatório!");
    }
    if (!password) {
      throw new AppError("Senha é obrigatória!");
    }

    await knex("users").insert({
      name,
      email,
      password,
    });

    response.json();
  }
}

module.exports = UsersController;
