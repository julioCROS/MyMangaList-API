const mongoose = require('mongoose');
const User = mongoose.model('User');
const md5 = require('md5');
const dotenv = require('dotenv');
dotenv.config();

exports.create = async(data) => {
  data.password = md5(data.password + process.env.SALT_KEY);
  await User.create(data);
}

exports.update = async(id, data) => {
  await User.findByIdAndUpdate(id, data);
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

