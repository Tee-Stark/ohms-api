import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.resolve(path.join(__dirname, '../uploads'));

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (_req, file, cb) => {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`
    );
  },
});

const fileUpload = multer({
  storage,
  limits: {
    fileSize: 10485760, // a file size limit of 10mb for files
  },
});

export default fileUpload;
