// const express = require('express');
// const app = express();
// const config = require('./config/config');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const passport = require('passport');
// const db = config.dbPassword;
// const cors = require ('cors');
// const path = require('path');

// const keys = require("./config/keys");
// mongoose.connect('mongodb+srv://Badal:ambadcr7@learn.fxagg.mongodb.net/ramkumar?retryWrites=true&w=majority',
// { useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex: true,useFindAndModify:false}).then(() => console.log('MongoDB Connected'))
// .catch(err => console.log(err))

// app.use(cors());
// app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname,'/public')));

// require('./middleware/passport')(passport) // as strategy in ./passport.js needs passport object

// app.use('/users',require('./route/user'));
// app.use('/signUp',require('./route/signUp'));
// app.use('/signIn',require('./route/signIn'));
// app.get("/user",(req,res)=>{
//     res.json({Project:"Ramkumar Pradhan"});
// });

// if(process.env.NODE_ENV=="production"){
//     app.use(express.static("client/build"));
//     const path = require ("path");
//     app.get("*",(req,res)=>{
//          res.sendFile(path.resolve(__dirname,"client","build","index.html"))

//     })
// }

// const port = config.port;
// app.listen( process.env.PORT || port);
// console.log(`Server Starts Running on port ${port}`)
const { cloudinary } = require('./utils/cloudinary');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/api/images', async (req, res) => {
    const { resources } = await cloudinary.search
        .expression('folder:assets')
        .sort_by('public_id', 'desc')
        .max_results(30)
        .execute();

    const publicIds = resources.map((file) => file.public_id);
    res.json(publicIds);
});
app.post('/api/upload', async (req, res) => {
    
        const fileStr = req.body.data;
        // console.log(fileStr);
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'ml_default',
        });
        // console.log(uploadResponse);
        res.json({ msg: 'yaya' });
   
});

if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"));
    const path = require ("path");
    app.get("*",(req,res)=>{
         res.sendFile(path.resolve(__dirname,"client","build","index.html"))

    })
}
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('listening on 3001');
});
