const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const authService = require('../services/authService');

router.get('/', authService.authorize, controller.get);
router.get('/id/:id', authService.authorize, controller.getById);
router.post('/', controller.post);
router.put('/:id', authService.authorize, controller.put);
router.delete('/:id', authService.authorize, controller.delete);

module.exports = router;