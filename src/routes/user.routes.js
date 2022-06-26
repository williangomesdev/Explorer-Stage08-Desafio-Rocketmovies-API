const { Router } = require("express");

const usersRoutes = Router();

usersRoutes.post("/", (request, response) => {
  const { name, email, password, avatar } = request.body;

  response.send(
    `Usuário: ${name} <br/> E-mail: ${email}</br> Senha: ${password} <br/> Avatar:${avatar}`
  );
});

module.exports = usersRoutes;
