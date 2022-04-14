const mongoose = require('mongoose');
const Manga = mongoose.model('Manga');
const slug = require('../utils/slugTitle');

exports.get = () => {
  return Manga.find();
};

exports.getBySlug = (slug) => {
  return Manga.findOne({ 
    slug: slug,
  });
};

exports.getById = (id) => {
  return Manga.findById(id);
};

exports.getByGenres = (genre) => {
  return Manga.find({
    genres: genre
  });
};

exports.create = (data) => {
  let manga = new Manga(data);
  manga.slug = slug.slugTitle(newManga.title);
  return manga.save();
};

exports.update = (id, data) => {
  return Manga.findByIdAndUpdate(id, {
    $set: data
  });
};

exports.delete = (id) => {
  return Manga.findByIdAndRemove(id);
};