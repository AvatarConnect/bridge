export default {
  privateRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    deploymentEnv: process.env.DEPLOYMENT_ENV,
    imageProvider: process.env.CLOUDINARY_NAME
      ? 'cloudinary'
      : process.env.DEPLOYMENT_ENV === 'production'
      ? 'vercel'
      : undefined,
    infuraId: process.env.INFURA_ID,
    runtime: process.env.DEPLOYMENT_ENV || 'development',
  },

  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    deploymentEnv: process.env.DEPLOYMENT_ENV,
    imageProvider: process.env.CLOUDINARY_NAME
      ? 'cloudinary'
      : process.env.DEPLOYMENT_ENV === 'production'
      ? 'vercel'
      : undefined,
    infuraId: process.env.INFURA_ID,
    runtime: process.env.DEPLOYMENT_ENV || 'development',
  },
}
