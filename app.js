require('zv-load.env')();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRouter = require('./routers/userRouter');
const ticketRouter = require('./routers/ticketRouter');
const errorHandler = require('./utils/errorHandler');

// 3rd PARTY MIDDLEWARES
// security
// app.use(helmet()); // uncomment for production
// handle CORS error
app.use(cors());
// MongoDB connection
mongoose.connect(process.env.DATABASE.replace('<password>', process.env.DB_PASSWORD),
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

if (process.env.NODE_ENV !== 'production')
{
  const connection = mongoose.connection;
  connection.on('open', () => console.log('MongoDB is connected'));
  connection.on('error', error => console.log(error));
  // logger
  app.use(morgan('dev'));
}
// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ENDPOINTS / ROUTES
app.get('/', (req, res) => res.json({ message: 'Team zv' }));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tickets', ticketRouter);

// ERROR HANDLER
app.use((req, res, next) =>
{
  const error = new Error('Resource not found!');
  error.status = 404;

  next(error);
});

app.use((error, req, res, next) =>
{
  errorHandler(error, res);
});

// START APPLICATION
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API is ready on http://localhost:${port}}`));