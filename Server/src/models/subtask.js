const mongoose = require('mongoose');
 
const subtaskSchema = new mongoose.Schema ({
  subtaskName : {type : String},
  status : { type: String, default: 'pending'}
});

module.exports = subtaskSchema;