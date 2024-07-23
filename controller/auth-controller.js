const {Auth} = require('../models/auth');
const bcrypt = require('bcryptjs');
const jwt = require('../services/jwt-token');

const signIn = async(req,res)=>{
    const {username,password} = req.body;
    // const hashPassword = await bcrypt.hash(password,10)
    console.log(username,password);
    
    const auth = new Auth({
        username,
        password
    })
   await auth.save();
    res.send('signed in sucessfully');
}
const logIn = async(req,res)=>{
   try{
    const {username,password} = req.params;
    const user = await Auth.findOne({username});
    if(!user){
        throw new Error('Username is invalid');
    }
    const match = bcrypt.compareSync(password, user.password);
    if(match){
        const token = await jwt.generateToken(user);
        res.send({user,token});
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
            return token.token !== req.token 
        })
        await req.user.save()
        res.send('Loged Out sucessfully')
    }catch(err){
        res.status(500).send()
    }
};

const logOutAll = async(req,res,next)=>{
    try{
        req.user.tokens = [];
        await req.user.save()
        res.send('Logged out from all accounts sucessfully')
    }catch(err){
        res.status(500).send()
    }
}

module.exports={
    signIn,logIn,logOut,logOutAll
}