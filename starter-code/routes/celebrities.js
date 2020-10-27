const express = require("express");
const router = express.Router();

const Celebrity = require("../models/Celebrity");

//show all celebrities
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      // console.log("celebs from DB: ", celebrities);
      res.render("celebrities/index", { celebrities });
    })
    .catch((err) => {
      console.log("Error retrieving celebrities from DB", err);
      next();
    });
});

//show individual celebrity
router.get("/celebrities/:celebrityId", (req, res, next) => {
  Celebrity.findById(req.params.celebrityId)
    .then((celebrityData) => {
      res.render("celebrities/show", { celebrity: celebrityData });
    })
    .catch((err) => {
      console.log("Error finding celebrity data", err);
      next();
    });
});

//Add new celebrities to database:
router.get("/celebrities/new", (req, res, next) => {
  console.log("this is the get route for create new celeb");
  res.render("/celebrities/new");
});

router.post("/celebrities/new", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({ name, occupation, catchPhrase});
  newCelebrity
  .save()  
  .then((celebrity) => {
      // res.send("New actor created", name, occupation, catchPhrase, req.body);
      console.log(celebrity);
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("Error creating new celebrity", err);
      res.render("/celebrities/new");
    });
});

// Iteration five: delete celebs
router.post("/celebrities/:celebrityId/delete", (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.celebrityId)
    .then((celebrity) => {
      console.log(celebrity);
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

module.exports = router;
