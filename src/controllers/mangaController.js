const mongoose = require('mongoose');
const Manga = mongoose.model('Manga');

exports.post = (req, res, next) => {
  var manga = new Manga(req.body);
  manga.save().then(x => {
    res.status(201).send({message: 'Manga created!'});
  }).catch(e => {
    res.status(400).send({message: 'Error while creating manga', data: e});
  });
};

exports.put = (req, res, next) => {
  let id = req.params.id;
  res.status(201).send({
    id: id,
    item: req.body
  })
};

exports.delete = (req, res, next) => {
  res.status(200).send(req.body)
}