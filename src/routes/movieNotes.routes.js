const { Router } = require("express");
const MovieNotesController = require("../controllers/MovieNotesController");

const movieNotesRoutes = Router();

const movieNotesController = new MovieNotesController();

movieNotesRoutes.post("/:user_id", movieNotesController.createMovieNotes);
movieNotesRoutes.get("/:id", movieNotesController.showMovieNotes);

module.exports = movieNotesRoutes;
