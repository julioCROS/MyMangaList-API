const mongoose = require('mongoose');
const Manga = mongoose.model('Manga');
const repository = require('../repositories/mangaRepository');

exports.get = (req, res, next) => {
  repository.get()
  .then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  });
};

exports.getBySlug = (req, res, next) => {
  repository.getBySlug(req.params.slug)
  .then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  });
};

exports.getById = (req, res, next) => {
  repository.getById(req.params.id)
  .then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  });
};

exports.getByGenres = (req, res, next) => {
  repository.getByGenres(req.params.genres)
  .then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  });
};

exports.post = (req, res, next) => {
  repository.create(req.body)
  .then(x => {
    res.status(201).send({message: 'Manga created!'});
  }).catch(e => {
    res.status(400).send({message: 'Error while creating manga', data: e});
  });
};

exports.put = (req, res, next) => {
  reposity.update(req.params.id, req.body)
  .then(x => {
    res.status(201).send({message: 'Manga updated!'});
  }).catch(e => {
    res.status(400).send({message: 'Error while updating manga', data: e});
  });
};

exports.delete = (req, res, next) => {
  repository.delete(req.params.id)
  .then(x => {
    res.status(201).send({message: 'Manga deleted!'});
  }).catch(e => {
    res.status(400).send({message: 'Error while deleting manga', data: e});
  });
};