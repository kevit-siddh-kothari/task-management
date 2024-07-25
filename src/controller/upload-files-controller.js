const fileUpload = (req,res)=>{
    try{
        res.status(200).send('Uploaded sucessfully');
    }catch(err){
        res.send(err.message)
        // console.log(err.message)
    }
};
module.exports={
    fileUpload
};