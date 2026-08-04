import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },

    filename: (req, file, cb) => {
        const nome = Date.now() + path.extname(file.originalname);
        cb(null, nome);
    }
});

export default multer({ storage });