const express = require('express');
const router = express.Router();
const controller = require('../controllers/mangaController');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/id/:id', controller.getById);
router.get('/genres/:genres', controller.getByGenres);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;