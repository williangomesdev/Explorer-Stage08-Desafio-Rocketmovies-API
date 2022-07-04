const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");
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
    const { name, email, password } = request.body;
    const { id } = request.params;

    const searchName = await knex("users").select("name")
    const nameAlreadyExists = searchName.filter(el => el.name == name).length;
    const searchEmail = await knex("users").select("email");
    const emailAlreadyExists  = searchEmail.filter(el => el.email == email).length;
    const userIdExists = await knex("users").select("id").where("id", [id]);


    if(userIdExists.length === 0) {
      throw new AppError("Usuário não encontrado");
    }
    if (emailAlreadyExists > 0) {
      throw new AppError("E-mail ja está em uso. favor adicionar outro endereço de e-mail ");
    }
    if(nameAlreadyExists > 0){
      throw new AppError("Nome de usuário ja está em uso por outro perfil, favor adicionar outro nome ");
    }

    hashedPassword = await hash(password, 8);

    await knex("users").where({ id }).update({
      name,
      email,
      password: hashedPassword,
    });
    response.json();
  }
}

module.exports = UsersController;
