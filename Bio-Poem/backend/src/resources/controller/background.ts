import fs from 'fs';
import path from 'path';
import cloudinary from '../../utils/cloudinary.upload';

const uploadImagesToCloudinary = (folderPath: any) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.log('Error reading folder:', err);
      return;
    }

    files.forEach((fileName) => {
      const imagePath = path.join(folderPath, fileName);

      cloudinary.uploader.upload(imagePath, (error, result) => {
        if (error) {
          console.log(`Error uploading ${fileName}:`, error);
        } else {
          console.log(`Image ${fileName} uploaded successfully.`);
          console.log(result);
        }
      });
    });
  });
};

export default uploadImagesToCloudinary;
