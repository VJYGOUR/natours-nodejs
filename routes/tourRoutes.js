const express = require('express');
const router = express.Router();

const {
  getAlltours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  // checkID,
} = require('../contollers/tourController');
// router.param('id', checkID);
router.route('/').get(getAlltours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
module.exports = router;
