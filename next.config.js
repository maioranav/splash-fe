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
      ],
   },
}

module.exports = nextConfig
