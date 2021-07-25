const express = require('express');
const route = express.Router();
const multer = require('multer');
const mongoose = require("mongoose");
const path = require('path');
const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join('uploads/'));
    },
    filename: function(req, file, cb) {
      cb(null,file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 10
    },
    // fileFilter: fileFilter
  });

  
 
const People = require('../models/People');
const {
    userAuth,
    userLogin,
    checkRole,
    userRegister,
    serializeUser
  } = require("../utils/auth");
  

route.post('/add',upload.single('image'),(req,res)=>{
    try{
      
        const post= new People({
         
            date: req.body.date,
            name: req.body.name,
            phone: req.body.phone,
            desc: req.body.desc,
            take: req.body.take,
            give: req.body.give,
            remain: req.body.remain,
            brief: req.body.brief,
            image: req.file.path 
        });
     
      post.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          post,
        //   request: {
        //     type: 'GET',
        //     url: "http://localhost:3000/user/" + result.image
        // }
            }
        
      });
    })
           
           
    
       
    }catch(err){
        return res.status(400).json({success:false,err:"Can't Process..."});
    }
    
})

route.post('/adds',upload.array('image',5),(req,res)=>{
  try{
    
      const post= new People({
       
          date: req.body.date,
          name: req.body.name,
          phone: req.body.phone,
          desc: req.body.desc,
          take: req.body.take,
          give: req.body.give,
          remain: req.body.remain,
          brief: req.body.brief,
          image: req.files.map(file=>file.path)
      });
   
    post.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Created People successfully",
      createdProduct: {
        post,
      //   request: {
      //     type: 'GET',
      //     url: result.image.map(result => {
      //         "http://localhost:3000/user/" + result
      //       })
          
      // }
          }
      
    });
  })
         
         
  
     
  }catch(err){
      return res.status(400).json({success:false,err:"Can't Process..."});
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


// route.get("/", async(req, res, next) => {
//   await People.find({})
//     .exec()
//     .then(req.bodys => {
//       const response = {
//         count: req.bodys.length,
//         people: req.bodys.map(req.body => {
//           return {
//             date: req.body.date,
//             name: req.body.name,
//             phone: req.body.phone,
//             desc: req.body.desc,
//             take: req.body.take,
//             give: req.body.give,
//             remain: req.body.remain,
//             brief: req.body.brief,
//             image: req.body.image,
//             request: {
//               type: "GET",
//               url: "http://localhost:3000/user/" + req.body._id
//             }
//           };
//         })
//       };
//       //   if (req.bodys.length >= 0) {
//       res.status(200).json(response);
//       //   } else {
//       //       res.status(404).json({
//       //           message: 'No entries found'
//       //       });
//       //   }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

route.put('/update/:id',upload.single('image'),(req,res)=>{
    People.findByIdAndUpdate(req.params.id,{
      $set: {
        date: req.body.date,
        name: req.body.name,
        phone: req.body.phone,
        desc: req.body.desc,
        take: req.body.take,
        give: req.body.give,
        remain: req.body.remain,
        brief: req.body.brief,
        image: req.file.path
      }},
        (err,post) => {
                 if(err) return res.status(400).json({success:false,err})
                 return res.status(200).json({ message: "Updated People successfully",
                 createdProduct: {
                   
                   request: {
                     type: 'GET',
                     url: "http://localhost:3000/user/" + req.file.filename
                 }
                     }});
     },
     );
});

route.put('/updates/:id',upload.array('image',5),(req,res)=>{
  if (req.body.image){
      var user = {
       
          date: req.body.date,
          name: req.body.name,
          phone: req.body.phone,
          desc: req.body.desc,
          take: req.body.take,
          give: req.body.give,
          remain: req.body.remain,
          brief: req.body.brief,
        
      
       
      }
     
  }
  else{
    var user = {
    
        date: req.body.date,
        name: req.body.name,
        phone: req.body.phone,
        desc: req.body.desc,
        take: req.body.take,
        give: req.body.give,
        remain: req.body.remain,
        brief: req.body.brief,
        image: req.files.map(file=>file.path)
      }
      
  }
 
    People.findByIdAndUpdate(req.params.id,{$set:user},
        (err,post) => {
                 if(err) return res.status(400).json({success:false,err})
                 return res.status(200).json({ message: "Updated People successfully",
               });
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

  route.delete("/delete/:id",userAuth,checkRole(["admin"]),(req, res) => {
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

  const downloadFiles = (req, res) => {
    const file_name = req.params.name;
    var DOWNLOAD_DIR = path.join(process.env.HOME || process.env.USERPROFILE, 'downloads/');
    var file_path = path.join(DOWNLOAD_DIR,file_name);
     const file = fs.createWriteStream(file_path);
    
      const request = http.get(`http://localhost:3333/uploads/${req.params.name}`, function(response) {
       response.pipe(file);
});
};

  route.get('/download/uploads/:name', downloadFiles);
  


module.exports = route;