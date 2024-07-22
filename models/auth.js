const mongoose = require('mongoose')

//schema defined
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
},{timestamps:true})

const bcrypt = require('bcrypt')
userSchema.pre('save',async function(next){
    const user = this
    user.password = await bcrypt.hash(user.password,8)
    console.log('hello')
    next()
})

//creating a model
const Auth = mongoose.model('authentications',userSchema)



module.exports ={
    Auth
}