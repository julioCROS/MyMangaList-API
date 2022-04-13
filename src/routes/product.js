const express = require('express');
const router = express.Router();
const controller = require('../controllers/product');

router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;