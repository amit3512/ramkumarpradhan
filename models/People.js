const mongoose = require('mongoose');

const PeopleSchema = new mongoose.Schema({
  
    date:{type:String,required:true},
    name:{type:String,required:true},
    phone:{type:Number,required:true},
    desc:{type:String,required:true},
    take:{type:Number,required:true},
    give:{type:Number,required:true},
    remain:{type:Number,required:true},
    brief:{type:String,required:true},
    image: { type: Array, required: true},
   
    
}, { timestamps: true })

module.exports = mongoose.model('People', PeopleSchema);
