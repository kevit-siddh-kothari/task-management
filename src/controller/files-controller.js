const fs = require('fs');
const path = require('path');
const {User} = require('../models/user')

const fileUpload = async(req,res)=>{
    try{
        console.log(req.file.buffer)
        req.user.avatar = req.file.buffer;
        await req.user.save();
        res.status(200).send('Uploaded sucessfully');
    }catch(err){
        res.send(err.message)
        // console.log(err.message)
    }
};

const fileDelete = async(req,res)=>{
    try{
        if(req.user.avatar==null){
           return res.send('Nothing to Delete')
        }
        const imageDir = `/home/kevit/Downloads/SID_NODEJS/Task-App/task-management/images/${req.user.avatar.filename}`
        console.log(imageDir)
        fs.unlinkSync(imageDir);
        req.user.avatar ={};
        await req.user.save();
        res.status(200).send('Image deleted sucessfully!');
    }catch(err){
        res.send(err);
    }
};

const fileView = async(req,res)=>{
    try{
        const {id} = req.params;
        console.log(id)
        const user = await User.findById(id);
        if(!user || !user.avatar){
            throw new Error();
        }
        //to set headers
        res.set('Content-Type','image/jpg');
        res.send(user.avatar);
    }catch(err){
        res.send(err.message);
    }
}
module.exports={
    fileUpload, fileDelete, fileView
};