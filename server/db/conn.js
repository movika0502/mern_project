const mongoose = require('mongoose');

const DB =process.env.DATABASE
 //database connection
mongoose.connect(DB).then(() =>{
    console.log('connection successful');
}).catch((err) => console.log('no connection'));

