import cloudinary from 'cloudinary';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
} from '../config/constants.config.js';

const { v2 } = cloudinary;

v2.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const upload = (file, folder) =>
  new Promise((resolve, reject) => {
    v2.uploader.upload(
      file,
      { folder },
      (err, result) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        return resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      },
      {
        resource_type: 'auto',
        folder,
      }
    );
  });

export default upload;
