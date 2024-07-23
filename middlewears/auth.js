const jwt = require('jsonwebtoken');
const {Auth} = require('../models/auth');

const authentication = async(req,res,next) =>{
    try{
        console.log(req.path);
        const token = req.header('Authorization').replace('Bearer','').trim();
        // console.log(token)
        const decoded = jwt.verify(token, 'thisismytoken');
        // console.log(decoded)
        const user = await Auth.findOne({_id:decoded._id, 'tokens.token': token});
        if(!user){
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    }catch(e){
        res.status(401).send('Please Authenticate');
    }
}
module.exports={
    authentication
}; 