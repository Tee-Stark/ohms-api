import cloudinaryUpload from '../handlers/cloudinary.js';

export const uploadFile = async (filePath, folder) => {
  const imageUrl = await cloudinaryUpload(filePath, folder);
  return imageUrl;
};
