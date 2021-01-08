const express = require('express');

const router = express.Router();

router.all('/', (req, res, next) =>
{
  res.json({ message: 'Team zV from the ticket router!' });
});

module.exports = router;