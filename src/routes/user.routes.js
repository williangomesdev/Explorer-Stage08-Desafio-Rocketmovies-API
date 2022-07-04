const { Router } = require("express");
const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.createUser);
usersRoutes.put("/:id", usersController.updateUser);

module.exports = usersRoutes;
