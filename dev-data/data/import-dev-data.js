const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((con) => {
  console.log(`DB connection successfully`);
});
//READ JSON FILES
const tours = fs.readFileSync('tours-simple.json', 'utf-8');
//IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await T;
  } catch (err) {}
};
