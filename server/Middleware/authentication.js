const jwt = require('jsonwebtoken')
const User = require('../model/user')

const authentication=async(req, res, next) =>{
    try{
        const token=req.cookies.jwttoken; // iss step me error he dekhtu hu me
        console.log("authenticate ", token)
        const verify=jwt.verify(token,process.env.SECRET_KEY);

        const rootuser=await User.findOne({_id:verify._id,"tokens.token":token});
        if(!rootuser){throw new Error('user not found')}

        req.token=token;
        req.rootuser=rootuser;
        req.userId=rootuser._id;

        next();

    }
    catch(err){
        res.status(401).send('unauthorized:no Token provided')
        console.log(err)
    }

}
module.exports =authentication;