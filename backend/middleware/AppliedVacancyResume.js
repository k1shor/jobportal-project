const multer = require('multer')
const fs = require('fs')
const path= require('path')


const storage =multer.diskStorage({
    destination: function(req, file, cb){
        let dstn = 'public/resume'
        if(!fs.existsSync(dstn)){
            fs.mkdirSync(dstn, {recursive: true})
        }
        cb(null, dstn)
    },
    filename: function(req, file, cb){
        let extname = path.extname(file.originalname)
        let basename = path.basename(file.originalname, extname)
        let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() *  1E9)
        let filename = basename + '-' + uniqueSuffix + extname
        cb(null, filename)
    }
})

const fileFilter =  (req, file, cb)=>{
    if(file.mimetype === 'application/pdf'){
        cb(null, true)
    }else{
        cb(new Error("file format invalid"), false)
    }
}

const resumeUpload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000
    },
    fileFilter: fileFilter
})

module.exports = resumeUpload