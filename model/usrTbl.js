const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true  
  },
  description:{
    type: String,
    required: true  
  },
  image:{
    type: String,
    required: true
  },
  ratings:{
    type: String,
    required: true
  }  
})

const user = mongoose.model("userTable",userSchema);
module.exports = user;