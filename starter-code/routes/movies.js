const express = require("express");
const router = express.Router();

const Movie = require("../models/Movie");

//Show all movies
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((movies) => {
      // console.log("movies from DB: ", movies);
      res.render("movies/index", { movies });
    })
    .catch((err) => {
      console.log("Error retrieving movies from DB", err);
      next();
    });
});

//show individual movies
router.get("/movies/:movieId", (req, res, next) => {
  // console.log("id fm url is", id);
  Movie.findById(req.params.movieId)
    .then((movieData) => {
      console.log(movieData);
      res.render("movies/show", { movie: movieData });
    })
    .catch((err) => {
      console.log("Error finding celebrity data", err);
      next();
    });
});

// add movie
router.get("/movies/new", (req, res, next) => {
  res.render("movies/new");
});

router.post("/movies/new", (req, res) => {
  const { title, genre, plot } = req.body;
  const newMovie = new Movie({ title, genre, plot });
  newMovie
    .save()
    .then((movie) => {
      // console.log(movie);
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log("Error creating new movie", err);
      res.render("/movies/movies/new");
    });
});

//delete
router.post("/movies/:movieId/delete", (req, res, next) => {
  Movie.findByIdAndRemove(req.params.movieId)
    .then((movie) => {
      console.log(movie);
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

module.exports = router;
