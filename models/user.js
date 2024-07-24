const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//schema defined
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required:true
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
        unique:true
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
});
userSchema.methods.getPublicProfile = function () {
    const user = this;
    const userObject = JSON.parse(JSON.stringify(user));
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};
//creating a model
const User = mongoose.model('user', userSchema);



module.exports ={
    User
};