const mongoose = require('mongoose');
 
const subtaskSchema = new mongoose.Schema ({
  subtaskName : {type : String}
})
 
const taskSchema= new mongoose.Schema({
  taskName : {type: String},
  description : {type: String},
  subtasks : [subtaskSchema],
})
 
const columnSchema = new mongoose.Schema({
  columnName: { type : String},
  tasks : [taskSchema]
})
 
const boardSchema = new mongoose.Schema({
  boardName: { type: String },
  columns: [columnSchema]
});
 
const Board = mongoose.model('Board', boardSchema);
 
module.exports = Board;
