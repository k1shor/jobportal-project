const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let dstn = 'public/profile'
        if(!fs.existsSync(dstn)){
            fs.mkdirSync(dstn, {recursive: true})
        }
        cb(null, dstn)
    },
    filename: function(req, file, cb){
        let extname = path.extname(file.originalname)
        let basename = path.basename(file.originalname, extname)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9)
        const filename = basename + '-' + uniqueSuffix + extname
        cb(null, filename)
    }
})

const fileFilter = (req, file, cb)=>{
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true)
  }else{
    cb(new Error("file format invalid"), false)
  }

}

const profileUpload = multer({
    storage: storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter: fileFilter
})
module.exports = profileUpload