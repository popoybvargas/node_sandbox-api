const { json } = require('express');
const express = require('express');

const controller = require('../controllers/userController');
const { createAccessJWT, createRefreshJWT } = require('../utils/jwt');
const { getJWT } = require('../utils/redis');

const router = express.Router();

router.get('/', (req, res, next) =>
{
  res.json({ message: 'Team zV from the user router!' });
});

// create new user
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

// log in user
router.post('/login', async (req, res) =>
{
  try
  {
    const { email, password } = req.body;

    if (!email || !password)
    {
      return res.status(403).json({ status: 'error', message: '💣 Email and password are required!' });
    }

    const user = await controller.findUserByEmail(email);

    if (user)
    {
      if (await controller.comparePassword(password, user.password))
      {
        const accessJWT = await createAccessJWT({ id: user._id.toString() });

        const refreshJWT = await createRefreshJWT({ id: user._id });
        const updatedUser = await controller.storeRefreshJWT(user._id, refreshJWT);

        return res.json({ status: 'success', message: 'Logged in successfully!', data: { accessJWT, refreshJWT, JWTFromRedis: await getJWT(accessJWT) }, updatedUser });
      }
    }
    
    res.status(200).json({ status: 'failed', message: '💣 Email or password is incorrect!' });
  }
  catch (error)
  {
    console.log(error);
    res.json({ status: 'error', message: `💣 ${error.message}` });
  }
});

module.exports = router;