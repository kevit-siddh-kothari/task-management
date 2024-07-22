const {Auth} = require('../models/auth')
const bcrypt = require('bcrypt')

const SignIn = async(req,res)=>{
    const {username,password} = req.body
    console.log(username,password)
    const auth = await Auth.create({
        username:username,
        password:password
    })
    await auth.save()
    res.send('signed in sucessfully')
}
const LogIn = async(req,res)=>{
   try{
    const {username,password} = req.params
    const user = await Auth.findOne({username:username})
    if(!user){
        throw new Error('Username is invalid')
    }
    const check = await bcrypt.compare(password,user.password)
    if(check){
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
    SignIn,LogIn
}