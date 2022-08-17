import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const PATH_DEST = path.join(path.dirname(__dirname), '../','/public/uploads') 
        cb(null, PATH_DEST)
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '-' + Math.round(Math.random()) + path.extname(file.originalname) 
        cb(null, file.fieldname + '-' + name )
    },
})

const upload = multer({  storage: storage });

export default upload;
