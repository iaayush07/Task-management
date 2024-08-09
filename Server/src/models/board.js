const mongoose = require('mongoose');
const columnSchema = require('./column')
 
const boardSchema = new mongoose.Schema({
  boardName: { type: String },
  columns: [columnSchema]
});
 
const Board = mongoose.model('Board', boardSchema);
 
module.exports = Board;
