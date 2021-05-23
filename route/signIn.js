// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const User = require('../models/User');

// router.post('/', (req, res, next) => {
//   User.find({ email: req.body.email })
//     .exec()
//     .then(user => {
//       if (user.length < 1) {
//         // 401 means unauthorized
//         return res.status(401).json({
//           message: 'Auth failed'
//         });
//       }
//       bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//         if (err) {
//           return res.status(401).json({
//             message: 'Auth failed'
//           });
//         }
//         if (result) {
//           const token = jwt.sign({
//             userId: user[0]._id,
//             firstName: user[0].firstName,
//             lastName: user[0].lastName,
//             email: user[0].email,
//           }, 
//           'my_secret_key',
//           {
//             expiresIn: "1h"
//           });
//           return res.status(200).json({
//             message: 'Auth successful',
//             token: token
//           });
//         }
//         res.status(401).json({
//           message: 'Auth failed'
//         });
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });
// router.get('/',async(req, res) => {
//   const products = await User.find({});
//   console.log(products);
//    res.send(products);
// });


// module.exports = router;

const router = require("express").Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser
} = require("../utils/auth");

// // Users Registeration Route
// router.post("/register-user", async (req, res) => {s
//   await userRegister(req.body, "user", res);
// });

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
  await userLogin(req.body,res);
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

module.exports = router;
