const mongoose = require('mongoose');
const taskSchema = require('./task')
 
const columnSchema = new mongoose.Schema({
  columnName: { type : String},
  tasks : [taskSchema]
});

module.exports = columnSchema;