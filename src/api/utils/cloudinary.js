/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
const cloudinary = require('cloudinary');
const uuid = require('uuid');
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const uploadToCloudinary = async (stream, folder, imagePublicId) => {
  const options = imagePublicId
    ? { public_id: imagePublicId, overwrite: true }
    : { public_id: `${folder}/${uuid.v4()}` };
  return new Promise((resolve, reject) => {
    const streamLoad = cloudinary.v2.uploader.upload_stream(
      options,
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    return streamifier.createReadStream(stream.buffer).pipe(streamLoad);
  });
};
const deleteFromCloudinary = async (publicId) =>
  new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(publicId, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
};
