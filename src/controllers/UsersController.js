class UsersController {
  createUser(request, response) {
    const { name, email, password, avatar } = request.body;

    response.json({
      name,
      email,
      password,
      avatar,
    });
  }
}

module.exports = UsersController;
