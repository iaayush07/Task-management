const mongoose = require('mongoose');
const subtaskSchema = require('./subtask')
 
const taskSchema= new mongoose.Schema({
  taskName : {type: String},
  description : {type: String},
  subtasks : [subtaskSchema],
})

module.exports = taskSchema;