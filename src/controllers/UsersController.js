const { hash } = require("bcryptjs");
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

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    response.json();
  }

  async updateUser(request, response) {
    const { name, email } = request.body;
    const { id } = request.params;

    await knex("users").where({ id }).update({
      name,
      email,
    });

    response.json();
  }
}

module.exports = UsersController;
