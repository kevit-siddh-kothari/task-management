const mongoose = require('mongoose');

//schema defined
const userSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
    },
    task: {
        type:String
    },
    completed:{
        type:Boolean,
        default:false
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true});

//creating a model
const Task = mongoose.model('task', userSchema);

module.exports = { 
    Task
};