const jwt = require('jsonwebtoken');

const { setJWT } = require('./redis');

exports.createAccessJWT = async (payload) =>
{
  try
  {
    const accessJWT = await jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    await setJWT(accessJWT, payload.id);

    return accessJWT;
  }
  catch (error) { Promise.reject(error); }
};

exports.createRefreshJWT = payload =>
{
  const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

  return Promise.resolve(refreshJWT);
};