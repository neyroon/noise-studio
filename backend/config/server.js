module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("NEXT_PUBLIC_STRAPI_API_URL", ""),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET"),
    },
  },
});
