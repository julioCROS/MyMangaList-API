const repository = require('../repositories/userRepository');
const emailService = require('../services/emailService');

exports.post = async(req, res, next) => {
  try {
    await repository.create(req.body);
    emailService.send(req.body.email, ' [MyMangaList] - Bem-vindo(a) ao site ', process.env.EMAIL_TEMPLATE_WELCOME.replace('{0}', req.body.userName));
    res.status(201).send({ message: 'User created!' });
  } catch (e) {
    res.status(500).send({ message: 'Error while creating user', data: e });
  }
}

exports.put = async(req, res, next) => {
  try {
    await repository.update(req.params.id, req.body)
    res.status(201).send({ message: 'User updated!' });
  } catch (e) {
    res.status(500).send({ message: 'Error while updating user', data: e });
  }
}

exports.delete = async(req, res, next) => {
  try {
    await repository.delete(req.params.id)
    res.status(201).send({ message: 'User deleted!' });
  } catch (e) {
    res.status(500).send({ message: 'Error while deleting user', data: e });
  }
}

exports.get = async(req, res, next) => {
  try {
    let data = await repository.get()
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send({ message: 'Error while getting user', data: e });
  }
}

exports.getById = async(req, res, next) => {
  try {
    let data = await repository.getById(req.params.id)
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send({ message: 'Error while getting user', data: e });
  }
}