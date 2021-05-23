
const express = require('express');
const route = express.Router();
 
const People = require('../models/People');

route.post('/add',(req,res)=>{
    try{
        const post= new People(req.body);
        post.save(()=>{
           
            return res.status(200).json({success:true,post});
    
        });
    }catch(err){
        return res.status(400).json({success:false,err});
    }
    
})

route.get('/',async(req,res)=>{
    try {
        const user = await People.find({}).sort({createdAt:-1});
        return res.status(200).json({success:true,users:user});
       } 
       catch(err){
        return res.status(400).json({success:false,err});
       }
});

route.put('/update/:id',(req,res)=>{
    People.findByIdAndUpdate(req.params.id,req.body,
        (err,posts) => {
                 if(err) return res.status(400).json({success:false,err})
                 return res.status(200).json({success:true});
     },
     );
});

route.get("/:id",(req, res) => {
  
    People.findById(req.params.id).exec((err,user)=>{
    if(err) {
        return res.send(err);
    }
    return res.json({success:true,user});
          });
    
   
  });

  route.delete("/delete/:id",(req, res) => {
  try{
        People.findByIdAndRemove(req.params.id).exec((deleteItem)=>{
        return res.json({success:true,deleteItem});
          });
  }
   
    catch(err) 
    {
        return res.json(err);
    }
    
    
   
  });


module.exports = route;