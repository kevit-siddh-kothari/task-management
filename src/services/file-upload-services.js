const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({
    dest:'images',
    limits: {
        fileSize: 1000000 // number in bytes
    },
    storage: storage,
    fileFilter(req, file, cb){
        console.log('hi');
        //match excepts regex pattern endswit do not except it
       if(!file.originalname.endsWith('.jpg')){ //if we want to add more extensions at the end of our code use regex patterns
            return cb(new Error('please upload a pdf'))
       }
       cb(undefined,true)
    },
});

module.exports={
    upload
};