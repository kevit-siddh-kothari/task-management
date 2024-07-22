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

//creating a model
const Auth = mongoose.model('authentications',userSchema)

module.exports ={
    Auth
}