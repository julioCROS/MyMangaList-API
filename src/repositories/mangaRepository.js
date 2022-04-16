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
  const defaultCover = 'https://i.ibb.co/wgCfP2Q/my-Manga-List-default-manga-cover.png';
  if(data.cover !== defaultCover){
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