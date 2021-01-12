const mongoose = require('mongoose');

const schema = new mongoose.Schema(
{
  name:
  {
    type: String,
    required: true,
    minlength: [ 2, 'Name is too short' ],
    maxlength: [ 50, 'Name is too long' ]
  },
  email:
  {
    type: String,
    required: true,
    unique: true
  },
  password:
  {
    type: String,
    required: true,
    minlength: [ 8, 'Password should be at least 8 characters long' ]
  },
  role:
  {
    type: String,
    required: true,
    default: 'user'
  },
  photo: String,
  active:
  {
    type: Boolean,
    default: true
  },
  refreshJWT:
  {
    token:
    {
      type: String,
      maxlength: 500,
      default: ''
    },
    addedAt:
    {
      type: Date,
      required: true,
      default: Date.now()
    }
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const User = mongoose.model('User', schema);

module.exports = User;