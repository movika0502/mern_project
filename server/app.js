 const dotenv=require("dotenv");
const mongoose = require('mongoose');
const express= require('express');
const app =express();
const cookieParser = require('cookie-parser');

dotenv.config({path:'./.env'})
require('./db/conn')
app.use(express.json());
app.use(cookieParser())
const authRoute = require('./router/auth')
const port= process.env.PORT 

app.use(authRoute)





//Middleware
// const middleware=(req,res,next) => {
//     console.log("hii middleware");
//     next();
// }
//get and post method call

app.get('/login', (req, res) => {
    res.cookie('test','token')
    res.send("Hello Server")
});



//listen on port

app.listen(port, () => {
    console.log(`server is running at port no ${port}`)
    
})
