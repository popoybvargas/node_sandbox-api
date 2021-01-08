const express = require('express');

const controller = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res, next) =>
{
  res.json({ message: 'Team zV from the user router!' });
});

router.post('/', async (req, res) =>
{
  try
  {
    const result = await controller.insertUser(req.body);
    res.json({ message: 'New user created', result } );
  }
  catch (error)
  {
    console.log(error);
    res.json({ status: 'error', message: `💣 ${error.message}` });
  }
});

module.exports = router;