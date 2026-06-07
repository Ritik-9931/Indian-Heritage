import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (file, folder = "temples") => {
  const result = await cloudinary.uploader.upload(file, {
    folder,
  });

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

export default uploadToCloudinary;
