const db = require("../models");
const Movie = db.movies; 

  // Création d'un film
  const movie = new Movie({
    name: req.body.name,
    genre: req.body.genre,
    released: req.body.released ? req.body.released : false,
  });

// Enregistrement d'un nouveau film
exports.create = (req, res) => {
  // Valider la requête
  if (!req.body.name) {
    res.status(400).send({ message: "Le contenu ne peut pas être vide !" });
    return;
  }

  // Enregistrement d'un film dans la BD
  movie
    .save(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la création du film.",
      });
    });
};

// Affichage de l'ensemble des films de la BD
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
        message: "Une erreur est survenue lors de la récupération des films.",
      });
    });
};

// Affichage d'un film avec un ID donné
exports.findOne = (req, res) => {
  const id = req.params.id;
  Movie.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Aucun film trouvé avec l'ID ${id}` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Erreur lors de la récupération du film d'ID ${id}` });
    });
};

// Trouver tous les films enregistrés
exports.findAllReleased = (req, res) => {
  Movie.find({ released: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la récupération des films.",
      });
    });
};

// Mettre à jour un film avec l'ID spécifié dans la requête
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Les données à mettre à jour ne peuvent pas être vides !",
    });
  }
  const id = req.params.id;
  Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de mettre à jour le film d'ID ${id}. Film introuvable !`,
        });
      } else res.send({ message: "Mise à jour réussie." });
    })
    .catch(err => {
      res.status(500).send({
        message: `Erreur lors de la mise à jour du film ${id}`,
      });
    });
};

// Suppression de tous les films de la BD
exports.deleteAll = (req, res) => {
  Movie.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} films ont été supprimés avec succès !`,
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur est survenue lors de la suppression des films.",
      });
    });
};

// Suppression d'un film de la BD
exports.delete = (req, res) => {
  const id = req.params.id;
  Movie.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de supprimer le film avec l'ID ${id}.`,
        });
      } else {
        res.send({
          message: "Film supprimé avec succès !",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Suppression impossible.`,
      });
    });
};