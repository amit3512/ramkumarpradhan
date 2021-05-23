const express = require('express');
const app = express();
const config = require('./config/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = config.dbPassword;
const cors = require ('cors');


mongoose.connect(db,
{ useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex: true,useFindAndModify:false}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

app.use(cors());
app.use(bodyParser.json());

app.use('/users',require('./route/user'));
app.use('/signUp',require('./route/signUp'));
app.use('/signIn',require('./route/signIn'));
app.get("/user",(req,res)=>{
    res.json({Project:"Ramkumar Pradhan"});
});

if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"));
    const path = require ("path");
    app.get("*",(req,res)=>{
         res.sendFile(path.resolve(__dirname,"client","build","index.html"))

    })
}

const port = config.port;
app.listen( process.env.PORT || port);
console.log(`Server Starts Running on port ${port}`)