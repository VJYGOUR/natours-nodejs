const express = require('express');
const router = express.Router();

const {
  getAlltours,
  createTour,
  getTour,
  checkID,
  checkBody,
} = require('../contollers/tourController');
router.param('id', checkID);
router.route('/').get(getAlltours).post(checkBody, createTour);
router.route('/:id').get(getTour);
module.exports = router;
