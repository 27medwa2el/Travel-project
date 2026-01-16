/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
  images: {
    domains: [
      "t1.gstatic.com",
      "t2.gstatic.com",
      "t3.gstatic.com",
      "upload.wikimedia.org",
      "links.papareact.com",
      "images.trvl-media.com",
      "api.slingacademy.com",
      "img.clerk.com",
      "clerk.com",
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "lh4.googleusercontent.com",
      "lh5.googleusercontent.com",
      "lh6.googleusercontent.com",
      "googleusercontent.com",
    ],
  },
};
