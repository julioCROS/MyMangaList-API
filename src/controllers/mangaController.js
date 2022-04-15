const repository = require('../repositories/mangaRepository');

exports.get = async(req, res, next) => {
  try{
    let data = await repository.get()
    res.status(200).send(data)
  }catch(e){
    res.status(500).send({message: 'Error while getting manga', data: e});
  }  
};

exports.getBySlug = async(req, res, next) => {
  try {
    var data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({ message: 'Error while getting manga', data: e });
  }
};

exports.getById = async(req, res, next) => {
  try{
    var data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch(e){
    res.status(500).send({message: 'Error while getting manga', data: e});
  }
};

exports.getByGenres = async(req, res, next) => {
  try{
    var data = await repository.getByGenres(req.params.genres);
    req.status(200).send(data);
  } catch(e){
    res.status(500).send({message: 'Error while getting manga', data: e});
  }
};

exports.post = async(req, res, next) => {
  try{
    await repository.create(req.body);
    res.status(201).send({message: 'Manga created!'});
  } catch(e){
    res.status(500).send({message: 'Error while creating manga --->  ' + e});
  }
};

exports.put = async(req, res, next) => {
  try{
    await reposity.update(req.params.id, req.body)
    res.status(201).send({message: 'Manga updated!'});
  } catch(e){
    res.status(500).send({message: 'Error while updating manga', data: e});
  }
};

exports.delete = async(req, res, next) => {
  try{
    await repository.delete(req.params.id)
    res.status(201).send({message: 'Manga deleted!'});
  } catch(e){
    res.status(500).send({message: 'Error while deleting manga', data: e});
  }
};