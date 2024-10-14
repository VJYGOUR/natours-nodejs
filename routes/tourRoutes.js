const express = require('express');
const router = express.Router();
router.param('id', checkID);
const {
  getAlltours,
  createTour,
  getTour,
  checkID,
} = require('../contollers/tourController');
router.route('/').get(getAlltours).post(createTour);
router.route('/:id').get(getTour);
module.exports = router;
