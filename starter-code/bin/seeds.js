const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");
// const Movies = require("../models/Movie");

mongoose
  .connect("mongodb://localhost/library", {
    useNewUrlParser: true,
  })
  .then((x) => {
    console.log(`Connected to MongoDB at "{x.connections[0].name}"`);
  });

const celebrities = [
  {
    name: "Sean Connery",
    occupation: "actor",
    catchPhrase: "Shaken not stirred",
  },
  {
    name: "Meryl Streep",
    occupation: "actress",
    catchPhrase:
      "The minute you start caring about what other people think, is the minute you stop being yourself.",
  },
  {
    name: "Aubrey Plaza",
    occupation: "actress and comedian",
    catchPhrase:
      "If you feel like a weirdo, it's okay because weirdos rule the world.",
  },
];

const movies = [
  {
    title: "Snatch",
    genre: "crime, comedy",
    plot:
      "Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.",
  },
  {
    title: "Death at a Funeral",
    genre: "comedy",
    plot:
      "Chaos ensues when a man tries to expose a dark secret regarding a recently deceased patriarch of a dysfunctional British family.",
  },
  {
    title: "Vertical Limit",
    genre: "adventure, drama",
    plot:
      "A climber must rescue his sister on top of K2, one of the world's biggest mountains.",
  },
];

//Problem: celebrities not loading in console or in browser from view
//Solution: insert connection to mongoose, and create celebs WITHIN that connection
//Also, make sure to pass the correct path to the right database in mongoose.connect

mongoose
  .connect("mongodb://localhost/library", {
    useNewUrlParser: true,
  })
  .then((x) => {
    console.log(
      `Connected to MongoDB from seeds.js! Database name: "${x.connections[0].name}"`
    );

    Celebrity.create(celebrities, (err, celebrity) => {
      if (err) {
        return handleError(err);
      }
      console.log("creating celebs:", celebrity);
      //x.connections[0].close();
    });

    Movies.create(movies, (err, movie) => {
      if (err) {
        return handleError(err);
      }
      console.log("Creating movies", movies);
      x.connections[0].close(); //this is where i had connection when seeding db
    });
    //x.connections[0].close();
  })
  .catch((err) => {
    console.error("Error connecting to DB", err);
  });
