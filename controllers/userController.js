const bcrypt = require('bcrypt');

const User = require('../models/User');

const saltRounds = 10;

exports.insertUser = userObj =>
{
  const { password } = userObj;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  const newUserObj = { ...userObj, password: hashedPassword };

  return new Promise((resolve, reject) =>
  {
    User(newUserObj).save()
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

exports.findUserByEmail = email =>
{
  return new Promise((resolve, reject) =>
  {
    User.findOne({ email }, (error, data) =>
    {
      if (error) reject(error);

      resolve(data);
    });
  });
};

exports.comparePassword = (password, hashedPassword) =>
{
  return bcrypt.compare(password, hashedPassword);
}

exports.storeRefreshJWT = (_id, token) =>
{
  return new Promise((resolve, reject) =>
  {
    User.findOneAndUpdate({ _id },
    { refreshJWT: { token, addedAt: Date.now() } }, { new: true })
    .then(data => resolve(data))
    .catch(error => reject(error));
  });
};