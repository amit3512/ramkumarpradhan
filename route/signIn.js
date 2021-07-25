const router = require("express").Router();
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport')
const {SENDGRID_API_KEY,EMAIL} = require('../config/keys');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
      api_key:SENDGRID_API_KEY
  }
}))


// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser
} = require("../utils/auth");

// Users Registeration Route
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// // Admin Registration Route
// router.post("/register-admin", async (req, res) => {
//   await userRegister(req.body, "admin", res);
// });

// // Super Admin Registration Route
// router.post("/register-super-admin", async (req, res) => {
//   await userRegister(req.body, "superadmin", res);
// });

// Users Login Route
router.post("/", async (req, res) => {
  await userLogin(req.body,"admin",res);
});


// // Admin Login Route
// router.post("/login-admin", async (req, res) => {
//   await userLogin(req.body, "admin", res);
// });

// // Super Admin Login Route
// router.post("/login-super-admin", async (req, res) => {
//   await userLogin(req.body, "superadmin", res);
// });

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// // Users Protected Route
// router.get(
//   "/user-protectd",
//   userAuth,
//   checkRole(["user"]),
//   async (req, res) => {
//     return res.json("Hello User");
//   }
// );

// // Admin Protected Route
// router.get(
//   "/admin-protectd",
//   userAuth,
//   checkRole(["admin"]),
//   async (req, res) => {
//     return res.json("Hello Admin");
//   }
// );

// // Super Admin Protected Route
// router.get(
//   "/super-admin-protectd",
//   userAuth,
//   checkRole(["superadmin"]),
//   async (req, res) => {
//     return res.json("Hello Super Admin");
//   }
// );

// // Super Admin Protected Route
// router.get(
//   "/super-admin-and-admin-protectd",
//   userAuth,
//   checkRole(["superadmin", "admin"]),
//   async (req, res) => {
//     return res.json("Super admin and Admin");
//   }
// );


router.post('/reset-password',(req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const token = buffer.toString("hex")
      User.findOne({email:req.body.email})
      .then(user=>{
          if(!user){
              return res.status(422).json({error:"User dont exists with that email"})
          }
          user.resetToken = token
          user.expireToken = Date.now() + 3600000
          user.save().then((result)=>{
              transporter.sendMail({
                  to:"ambadcr7@gmail.com",
                  from:"shresthahome13@gmail.com",
                  subject:"password reset",
                  html:`
                  <p>You requested for password reset</p>
                  <h5>click in this <a href="http:/localhost:3000/reset/${token}">link</a> to reset password</h5>
                  `
              })
              res.json({message:"check your email"})
          })

      })
  })
})


router.post('/new-password',(req,res)=>{
 const newPassword = req.body.password
 const sentToken = req.body.token
 User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
 .then(user=>{
     if(!user){
         return res.status(422).json({error:"Try again session expired"})
     }
     bcrypt.hash(newPassword,12).then(hashedpassword=>{
        user.password = hashedpassword
        user.resetToken = undefined
        user.expireToken = undefined
        user.save().then((saveduser)=>{
            res.json({message:"password updated success"})
        })
     })
 }).catch(err=>{
     console.log(err)
 })
})


module.exports = router;
