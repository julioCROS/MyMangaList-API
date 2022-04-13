const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send(    {
      title: "My Manga List",
      version: "1.0.0",
      author: "julioCROS"
    });
});

module.exports = router;