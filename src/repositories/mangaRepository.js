const mongoose = require('mongoose');
const Manga = mongoose.model('Manga');
const imgbbUploader = require('imgbb-uploader');
const slug = require('../utils/slugTitle');
const dotevn = require('dotenv');
dotevn.config();

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
  if(data.cover !== undefined){
    const imgbbOptions = {
      apiKey: process.env.IMGBB_API_KEY,
      imagePath: data.cover,
      name: slug.slugTitle(data.title) + Date.now(),
    }

    imgbbUploader(imgbbOptions)
    .then(async (response) => {
      let manga = new Manga(data);
      manga.cover = response.url;
      manga.slug = slug.slugTitle(data.title);
      await manga.save();
    })
    .catch((error) => console.error(error));
  } else{
    let manga = new Manga(data);
    manga.cover = 'https://i.ibb.co/YRz2XVM/my-Manga-List-default-manga-cover.png';
    manga.slug = slug.slugTitle(data.title);
    await manga.save();
  }
};

exports.update = async(id, data) => {
  await Manga.findByIdAndUpdate(id, {
    $set: data,
  });
};

exports.delete = async(id) => {
  await Manga.findByIdAndRemove(id);
};