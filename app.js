const express = require('express');

const morgan = require('morgan');
const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//MIDDLEWARES

app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.route('/').get((req, res) => {
  res.send('hello world ');
});
//SERVER
module.exports = app;
