const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

const port = 3000;
//MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// GET ALL TOURS
const getAlltours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};
//GET TOUR
const getTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',

    data: {
      tour,
    },
  });
};
//CREATE TOUR
const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const updateUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const deleteUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
//ALL APIS
// for root route
app.route('/').get((req, res) => {
  res.send('hello world ');
});
app.route('/api/v1/tours').get(getAlltours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour);
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUsers)
  .delete(deleteUsers);
app.listen(port, () => {
  console.log(`App running on ${port}...`);
});
