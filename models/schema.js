const mongoose = require('mongoose');

//schema defined
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
    },
},{timestamps:true});

//creating a model
const user = mongoose.model('user', userSchema);

module.exports = { 
    user
}