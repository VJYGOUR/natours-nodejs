const express = require('express');
const router = express.Router();

const {
  getAlltours,
  createTour,
  getTour,
  // checkID,
} = require('../contollers/tourController');
// router.param('id', checkID);
router.route('/').get(getAlltours).post(createTour);
router.route('/:id').get(getTour);
module.exports = router;
