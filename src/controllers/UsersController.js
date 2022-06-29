const AppError = require("../utils/AppError");

class UsersController {
  createUser(request, response) {
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

    response.status(201).json({
      name,
      email,
      password,
      avatar,
    });
  }
}

module.exports = UsersController;
