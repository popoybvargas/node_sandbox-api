const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// MIDDLEARES
// security
app.use(helmet());
// handle CORS error
app.use(cors());
// logger
app.use(morgan('dev'));
// body parser
app.use(express.urlencoded());
app.use(express.json());

// app.use('/', (req, res, next) =>
app.get('/', (req, res) =>
{
  res.json({ message: 'Team zV rocks!' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API is ready on http://localhost:${port}}`));