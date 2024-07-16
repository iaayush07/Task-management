const mongoose = require('mongoose');
 
const subtaskSchema = new mongoose.Schema ({
  subtaskName : {type : String}
});

module.exports = subtaskSchema;