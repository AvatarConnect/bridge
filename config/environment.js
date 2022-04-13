import pkg from '../package.json'

export default {
  privateRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    cloudinaryName: process.env.CLOUDINARY_NAME,
    deploymentEnv: process.env.DEPLOYMENT_ENV,
    infuraId: process.env.INFURA_ID,
    runtime: process.env.DEPLOYMENT_ENV || 'development',
    version: pkg.version,
  },

  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    cloudinaryName: process.env.CLOUDINARY_NAME,
    deploymentEnv: process.env.DEPLOYMENT_ENV,
    infuraId: process.env.INFURA_ID,
    runtime: process.env.DEPLOYMENT_ENV || 'development',
    version: pkg.version,
  },
}
