const express = require('express');
const router = express.Router();
const controller = require('../controllers/mangaController');
const authService = require('../services/authService');

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/id/:id', controller.getById);
router.get('/genres/:genres', controller.getByGenres);
router.post('/', authService.authorize, controller.post);
router.put('/:id', authService.authorize, controller.put);
router.delete('/:id', authService.authorize, controller.delete);

module.exports = router;