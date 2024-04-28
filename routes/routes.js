//Mouhamed Abdallah SAKHO

module.exports = app => {
    app.use("/api/movies", router);
  };
  const movies = require("../controllers/controllers.js");
  let router = require("express").Router();
  
  // Create a new movies
  router.post("/", movies.create);
  
  // Retrieve all movies
  router.get("/", movies.findAll);
  
  //delete movie by ID
  router.delete("/:id", movies.delete);
  
  // Delete all movies
  router.delete("/", movies.deleteAll);
  
  // Recover all recorded movies
  router.get("/released", movies.findAllReleased);
  
  // Recover all recorded movies with ID
  router.get("/:id", movies.findOne);
  
  // Update a film with a specific ID
  router.put("/:id", movies.update);
  
