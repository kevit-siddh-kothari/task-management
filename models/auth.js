const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//schema defined
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    tokens: [{
        token:{
            type:String
        }
    }]
},{timestamps:true});


userSchema.pre('save', function(next){
    const user = this;
    if(user.isModified('password')){
        user.password =  bcrypt.hashSync(user.password , 10);
    }
    next();
})

//creating a model
const Auth = mongoose.model('authentications', userSchema);



module.exports ={
    Auth
}