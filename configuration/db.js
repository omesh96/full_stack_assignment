const mongoose = require('mongoose');
require("dotenv").config();

mongoose.set('strictQuery', true);

const Connection=mongoose.connect(process.env.MONGO_URL)

module.exports={Connection}