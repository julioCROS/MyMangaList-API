const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const authService = require('../services/authService');

router.get('/', authService.isAdmin, controller.get);
router.get('/id/:id', authService.isAdmin, controller.getById);
router.post('/', controller.post);
router.put('/:id', authService.authorize, controller.put);
router.delete('/:id', authService.isAdmin, controller.delete);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router;