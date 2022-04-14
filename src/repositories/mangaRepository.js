const mongoose = require('mongoose');
const Manga = mongoose.model('Manga');
const slug = require('../utils/slugTitle');

exports.get = async() => {
  const res = await Manga.find({});
  return res;
};

exports.getBySlug = async(slug) => {
  const res = await Manga.findOne({ 
    slug: slug,
  });
  return res;
};

exports.getById = async(id) => {
  const res = await Manga.findById(id);
  return res;
};

exports.getByGenres = async(genre) => {
  const res = await Manga.find({
    genres: genre
  });
  return res;
};

exports.create = async(data) => {
  let manga = new Manga(data);
  manga.slug = slug.slugTitle(data.title);
  await manga.save();
};

exports.update = async(id, data) => {
  await Manga.findByIdAndUpdate(id, {
    $set: data,
  });
};

exports.delete = async(id) => {
  await Manga.findByIdAndRemove(id);
};