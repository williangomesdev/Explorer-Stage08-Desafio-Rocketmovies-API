const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const sqliteConnection = require("../database/sqlite");
let hashedPassword;
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

    hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    response.json();
  }

  async updateUser(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
    const searchName = await knex("users").select("name");
    const searchEmail = await knex("users").select("email");
    const userIdExists = await knex("users").select("id").where("id", [id]);
    const emailAlreadyExists = searchEmail.filter(
      (el) => el.email == email
    ).length;
    const nameAlreadyExists = searchName.filter((el) => el.name == name).length;

    if (userIdExists.length === 0) {
      throw new AppError("Usuário não encontrado");
    } else if (emailAlreadyExists > 0) {
      throw new AppError(
        "E-mail ja está em uso. favor adicionar outro endereço de e-mail "
      );
    } else if (nameAlreadyExists > 0) {
      throw new AppError(
        "Nome de usuário ja está em uso por outro perfil, favor adicionar outro nome "
      );
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Senha antiga incorreta");
      }

      user.password = await hash(password, 8);
    }

    await knex("users").where({ id }).update({
      name,
      email,
      password: user.password,
    });
    response.json();
  }
}

module.exports = UsersController;
