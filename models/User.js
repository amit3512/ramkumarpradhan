
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:{type:String,required:true},
  
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },

  role:{
    type: String,
    default: "user",
    enum: ["user", "admin"]
  },

  password: { type: String, required: true },
  
  resetToken:String,
  expireToken:Date,

},

{ timestamps: true }

);

module.exports = mongoose.model('User', UserSchema);

