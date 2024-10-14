const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUsers,
  deleteUsers,
} = require('../contollers/userController');
//ALL APIS
// for root route

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUsers).delete(deleteUsers);
module.exports = router;
