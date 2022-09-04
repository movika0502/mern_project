const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../Middleware/authentication')

require('../db/conn');
const User = require('../model/user');


router.get('/', (req, res) => {
    res.send("Hello Kamal");

});

// promise use
// router.post('/register',  (req, res)=>{
//     const {name, email, password, cpassword, work,phone} = req.body;
//     //check condition to user 
//     if(!name|| !email|| !password|| !cpassword|| !work||!phone){
//         return res.status(422).json({error: 'please Enter the filed'})
//     }

//     User.findOne({email:email})//(1(database), 2(usefill))
//     .then((userExists) => {
//         if(userExists){
//             return res.status(422).json({error: 'Email already exists'})

//         }
//         const user=new User({email, password, name, cpassword, work, phone});

//         user.save().then(() => {
//             res.status(201).json({message: 'user register succesfully'});

//         }).catch((err) => {res.status(500).json({error: "Failed to register"})})
//     }).catch(err=> {console.log(err)});




// })
// async and await use
router.post('/register', async (req, res) => {

    const { name, email, password, cpassword, work, phone } = req.body;
    //check codition to user not enter the filled
    if (!name || !email || !password || !cpassword || !work || !phone) {
        return res.status(422).json({ error: 'please Enter the filed' })
    }
    try {
        //user already exists with email
        const userExists = await User.findOne({ email: email })//(1(database), 2(usefill))
        if (userExists) {
            return res.status(422).json({ error: 'Email already exists' })

        }
        const user = new User({ email, password, name, cpassword, work, phone });//not already exsist

        await user.save();
        res.status(201).json({ message: 'user register succesfully' })

    }
    catch (err) {
        console.log(err)

    }
})

router.post('/login', async (req, res) => {
    // res.json({message: "success"})
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(409).json({ message: "Please fill The corrent details" })
        }
        const userlogin = await User.findOne({ email: email });
        console.log(userlogin);
        if (userlogin) {
            const isMatch=await bcrypt.compare(password, userlogin.password);
        if(!isMatch){
            res.status(400).json({ error: "Invalid Credientials"})
        }
        else{
            const token = await userlogin.generateAuthToken();
            console.log(token);
            res.cookie('jwttoken', token,{
             expires: new Date(Date.now()+ 25892000000),
             httpOnly: true
            });
            res.status(200).json({ message: "User signin successful" })
        }
        }
        else {
            res.status(400).json({ message: "invalid Credientials" })

        }
    }
    catch (err) {
        console.log(err)
    }

    

})

router.get('/about',authenticate, (req, res) => {
        console.log("hello my about")
        res.send(req.rootuser)
       
})

router.get('/getdata',authenticate, (req, res) => {
    console.log("hello my about")
    res.send(req.rootuser)
   
})
router.get('/getdata',authenticate, (req, res) => {
    console.log("hello my about")
    res.send(req.rootuser)
   
})
router.post('/contact',authenticate, async (req, res) => {
    try{
        const {name, email, phone,message}= req.body
        if(!name || !email || !phone || !message){
            console.log("error in contact form")
            return res.json({error:"plzz filled the contact form"})
        }
        const userContact =  await User.findOne({_id:req.userId});

        if(userContact){
            const userMessage = await User.findByIdAndUpdate(userContact._id,{name:name,email:email, phone:phone,message:message})

            await userMessage.save()
            res.status(201).json({message:"userMessage Success"});
        }
    }
    catch(error){
        console.log(error)
    }
})
router.get('/logout', (req, res) => {
    console.log("hello my logout")
    res.clearCookie('jwtoken', {path: '/'})
    res.status(200).send('user Logout')
   
})
module.exports = router