//Mouhamed Abdallah SAKHO
//Sir I'm trying to improve my english while coding lol


const db = require("../models");
const Movie = db.movies; 

  // Create a film
  const movie = new Movie({
    name: req.body.name,
    genre: req.body.genre,
    released: req.body.released ? req.body.released : false,
  });

// Save a film
exports.create = (req, res) => {

  // Validation
  if (!req.body.name) {
    res.status(400).send({ message: "Can't be empty !" });
    return;
  }

  // Save a film in the database
  movie
    .save(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Cannot create the film",
      });
    });
};

// Show films from database
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};
  Movie.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error",
      });
    });
};

//Find by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Movie.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `No film ${id}` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `No film with the ID ${id}` });
    });
};

// Show all the films
exports.findAllReleased = (req, res) => {
  Movie.find({ released: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Cannot show films",
      });
    });
};

// Update with ID
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "The data can't be empty!",
    });
  }
  const id = req.params.id;
  Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find a film with ID ${id}.`,
        });
      } else res.send({ message: "Up to date" });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error while updating ${id}`,
      });
    });
};

// Delete
exports.deleteAll = (req, res) => {
  Movie.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} films have been deleted successfuly`,
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error while deleting",
      });
    });
};

// Delete a film from the database
exports.delete = (req, res) => {
  const id = req.params.id;
  Movie.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Can't delete the film ${id}.`,
        });
      } else {
        res.send({
          message: "The film has been deleted succesfully !",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Can't delete the film`,
      });
    });
};
