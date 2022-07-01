const { Router } = require("express");
const MovieNotesController = require("../controllers/MovieNotesController");

const movieNotesRoutes = Router();

const movieNotesController = new MovieNotesController();

movieNotesRoutes.post("/:user_id", movieNotesController.createMovieNotes);
movieNotesRoutes.get("/:id", movieNotesController.showMovieNotes);
movieNotesRoutes.delete("/:id", movieNotesController.deleteMovieNotes);
movieNotesRoutes.get("/", movieNotesController.indexMovie);

module.exports = movieNotesRoutes;
