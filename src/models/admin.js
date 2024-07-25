const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{Timestamp:true});

const Admin = mongoose.model('admin', adminSchema);




module.exports={
    Admin
};