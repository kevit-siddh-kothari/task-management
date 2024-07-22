const {Auth} = require('../models/auth')
const bcrypt = require('bcrypt')

const SignIn = async(req,res)=>{
    const {username,password} = req.body
    const hashedPassword = await bcrypt.hash(password,8)
    console.log(username,password)
    const auth = await Auth.create({
        username:username,
        password:hashedPassword
    })
    await auth.save()
    res.send('signed in sucessfully')
}
const LogIn = async(req,res)=>{
    const {username,password} = req.params
    const user = await Auth.findOne({username:username})
    console.log(user)
    const check = await bcrypt.compare(password,user.password)
    if(check){
        res.redirect('/api/user/')
    }else{
        res.send('Incorrect credentials')
    }
}
module.exports={
    SignIn,LogIn
}