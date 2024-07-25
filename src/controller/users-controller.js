const {User} = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('../services/jwt-token');

const signUp = async(req,res)=>{
    // const {username,password,firstName,lastName,email} = req.body;
   try{
    const user = new User(req.body);
    // const hashPassword = await bcrypt.hash(password,10)
    console.log(user)
    
    // const user = new User({
    //     username,
    //     password,
    //     firstName,
    //     lastName,
    //     email
    // })
   await user.save();
    res.send('signed up sucessfully');
   }catch(err){
    console.log(`please enter all the information required: ${err.message}`)
    res.send(err.message)
   }
}

const logIn = async(req,res)=>{
   try{
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        throw new Error('Username is invalid');
    }
    const match = bcrypt.compareSync(password, user.password);
    if(match){
        const token = await jwt.generateToken(user);
        res.send({user:user.getPublicProfile(),token});
    }else{
        throw new Error('Incorrect Credentials');
    }
   }catch(err){
    console.log(err);
    res.status(401).send(err.message);
   }
};

const logOut = async(req,res,next)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token ;
        })
        await req.user.save();
        res.send('Loged Out sucessfully');
    }catch(err){
        res.status(500).send();
    }
};

const logOutFromAllDevices = async(req,res,next)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send('Logged out from all accounts sucessfully');
    }catch(err){
        res.status(500).send();
    }
}

module.exports={
    signUp,logIn,logOut,logOutFromAllDevices
};