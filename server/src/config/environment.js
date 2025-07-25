import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRED: process.env.JWT_ACCESS_TOKEN_EXPIRED,

  BREVO_API_KEY: process.env.BREVO_API_KEY,
  ADMIN_EMAIL_ADDRESS: process.env.ADMIN_EMAIL_ADDRESS,
  ADMIN_EMAIL_NAME: process.env.ADMIN_EMAIL_NAME,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
