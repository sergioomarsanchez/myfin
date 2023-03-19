/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    APIKEY: process.env.APIKEY
  },
  images:{
    domains:["logo.clearbit.com", "static.seekingalpha.com"]
  }
}

module.exports = nextConfig
