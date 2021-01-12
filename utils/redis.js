const redis = require('redis');

const client = redis.createClient(process.env.REDIS_URL);
client.on('error', error => console.log(error));

exports.setJWT = async (key, value) =>
{
  return new Promise((resolve, reject) =>
  {
    client.set(key, value, (error, response) =>
    {
      if (error) reject(error);

      resolve(response);
    });
  });
};

exports.getJWT = key =>
{
  return new Promise((resolve, reject) =>
  {
    client.get(key, (error, response) =>
    {
      if (error) reject(error);

      resolve(response);
    });
  });
};