const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const port = 3000;
app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// for root route

// GET ALL TOURS
const getAlltours = (req, res) => {
  res.status(200).json({
    status: 'success',
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
//ALL APIS
app.route('/').get((req, res) => {
  res.send('Hello world');
});
app.route('/api/v1/tours').get(getAlltours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour);

app.listen(port, () => {
  console.log(`App running on ${port}...`);
});
