/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
// enabling using /app dir
  experimental:{
    appDir:true
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 10 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 1,
  },
}
