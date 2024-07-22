const {Auth} = require('../models/auth');
const bcrypt = require('bcryptjs');

const signIn = async(req,res)=>{
    const {username,password} = req.body
    // const hashPassword = await bcrypt.hash(password,10)
    console.log(username,password)
    const auth = await Auth.create({
        username,
        password
    })
   
    res.send('signed in sucessfully')
}
const logIn = async(req,res)=>{
   try{
    const {username,password} = req.params
    const user = await Auth.findOne({username})
    if(!user){
        throw new Error('Username is invalid')
    }
    // const pass = await bcrypt.hash(password,10)
    // const match = pass === user.password;
    // console.log(pass,user.password)
    const match = bcrypt.compareSync(password, user.password);
    if(match){
        res.redirect('/api/user/')
    }else{
        throw new Error('Incorrect Credentials')
    }
   }catch(err){
    console.log(err)
    res.status(401).send(err.message)
   }
}
module.exports={
    signIn,logIn
}