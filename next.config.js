const withPWA = require('next-pwa')({
   dest: 'public'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'www.radiosplash.it',
            port: '',
            pathname: '/**',
         },
         {
            protocol: 'https',
            hostname: 'upload.radiosplash.it',
            port: '',
            pathname: '/**',
         },
         {
            protocol: 'https',
            hostname: 'images.pexels.com',
            port: '',
            pathname: '/**',
         },
      ],
   },
}

module.exports = withPWA(nextConfig)