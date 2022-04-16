const slug = require('../utils/slugTitle');
const imgbbUploader = require('imgbb-uploader');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const md5 = require('md5');
const dotenv = require('dotenv');
dotenv.config();

exports.create = async(data) => {
  const defaultProfilePicture = 'https://i.ibb.co/nwfMnMC/my-Manga-List-default-user-profile-pic.png';
  if(data.profilePicture == undefined){
    data.profilePicture = defaultProfilePicture;
  }
  if(data.profilePicture !== defaultProfilePicture){
    const imgbbOptions = {
      apiKey: process.env.IMGBB_API_KEY,
      imagePath: data.profilePicture,
      name: slug.slugTitle(data.userName) + Date.now(),
    }

    imgbbUploader(imgbbOptions)
    .then(async (response) => {
      data.roles = ['user'];
      data.profilePicture = response.url;
      data.password = md5(data.password + process.env.SALT_KEY);
      await User.create(data);
    })
    .catch((error) => console.error(error));
  } else{
    data.roles = ['user'];
    data.password = md5(data.password + process.env.SALT_KEY);
    await User.create(data);
  }
}

exports.update = async(id, data) => {
  const user = await User.findById(id);
  if(user.profilePicture != data.profilePicture){
    const imgbbOptions = {
      apiKey: process.env.IMGBB_API_KEY,
      imagePath: data.profilePicture,
      name: slug.slugTitle(data.userName) + Date.now(),
    }

    imgbbUploader(imgbbOptions)
    .then(async (response) => {
      data.profilePicture = response.url;
      await User.findByIdAndUpdate(id, {
        $set: data,
      });
    })
    .catch((error) => console.error(error));
  } else {
    await User.findByIdAndUpdate(id, {
      $set: data,
    });
  }
}

exports.delete = async(id) => {
  await User.findByIdAndRemove(id);
}

exports.get = async() => {
  const res = await User.find().populate('mangaList', 'title');
  return res;
}

exports.getById = async(id) => {
  const res = await User.findById(id);
  return res;
}

exports.authenticate = async (data) => {
  const user = await User.findOne({
    email: data.email,
    password: md5(data.password + process.env.SALT_KEY)
  }) || await User.findOne({
    userName: data.userName,
    password: md5(data.password + process.env.SALT_KEY)
  });
  return user;
}

exports.getById = async (id) => {
  const user = await User.findById(id);
  return user;
}

