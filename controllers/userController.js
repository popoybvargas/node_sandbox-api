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