const mongoose = require('mongoose');
const Manga = mongoose.model('Manga');
const slug = require('../utils/slugTitle');

exports.get = (req, res, next) => {
  Manga.find().then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  });
};

exports.getBySlug = (req, res, next) => {
  Manga.findOne({ 
    slug: req.params.slug
  }).then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  });
};

exports.getById = (req, res, next) => {
  Manga.findById(req.params.id).then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  });
};

exports.getByGenres = (req, res, next) => {
  Manga.find({
    genres: req.params.genres
  }).then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  });
};

exports.post = (req, res, next) => {
  let manga = new Manga(req.body);
  manga.slug = slug.slugTitle(manga.title);
  manga.save().then(x => {
    res.status(201).send({message: 'Manga created!'});
  }).catch(e => {
    res.status(400).send({message: 'Error while creating manga', data: e});
  });
};

exports.put = (req, res, next) => {
  Manga.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }).then(x => {
    res.status(201).send({message: 'Manga updated!'});
  }).catch(e => {
    res.status(400).send({message: 'Error while updating manga', data: e});
  });
};

exports.delete = (req, res, next) => {
  Manga.findOneAndRemove(req.params.id).then(x => {
    res.status(201).send({message: 'Manga deleted!'});
  }).catch(e => {
    res.status(400).send({message: 'Error while deleting manga', data: e});
  });
};