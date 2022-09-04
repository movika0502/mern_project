const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user=new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true

    },
    phone:{
        type: 'number',
        required: true

    },
    work:{
        type: 'string',
        required: true

    },
    password:{
        type: 'string',
        required: true

    },
    cpassword:{
        type: 'string',
        required: true

    },
    date:{
        type:Date,  
        default:Date.now
    },
    messages:[
        {
            name:{
                type: 'string',
                required: true
            },
            email:{
                type: 'string',
                required: true
        
            },
            phone:{
                type: 'number',
                required: true
        
            },
            message:{
                type: 'string',
                required: false
        
            },
        }

    ],
    tokens:[
        {
            token:{
                type: 'string',
                required: true
            }
        }
    ]
   
})

user.pre('save', async function(next) {
    console.log("hii inside")
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();
})
user.methods.generateAuthToken= async function(){
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY)
        this.tokens=this.tokens.concat({token: token});
        await this.save();
        return token;


    }
    catch(error){

    }

}
//stored message

user.method.addMessage= async function(name, message,phone,email){
    try {
        thid.messages=this.messages.concat({name, message,phone,email})
        await this.save();
        
    } catch (error) {
        console.log(error);
        
    }

}
const USER=mongoose.model("person", user);
module.exports=USER;
