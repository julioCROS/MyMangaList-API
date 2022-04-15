const repository = require('../repositories/userRepository');
const emailService = require('../services/emailService');
const authService = require('../services/authService');

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

exports.authenticate = async(req, res, next) => {
  try {
    const user = await repository.authenticate(req.body);
    const token = await authService.generateToken({ 
      email: req.body.email, 
      userName: req.body.userName 
    });

    if(!user){
      res.status(401).send({
         message: 'User or password invalid.' 
      });
      return;
    }
    
    res.status(201).send({
      token: token,
      data: {
        email: req.body.email,
        userName: req.body.userName
      }
    });

  } catch (e) {
    res.status(500).send({ message: 'Error while authenticating user', data: e });
  }
}