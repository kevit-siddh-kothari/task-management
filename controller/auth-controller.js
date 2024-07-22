const {Auth} = require('../models/auth')

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
    const {username,password} = req.params
    const check = await Auth.findOne({username:username, password:password})
    if(check){
        res.redirect('/api/user/')
    }else{
        res.send('Incorrect credentials')
    }
}
module.exports={
    SignIn,LogIn
}