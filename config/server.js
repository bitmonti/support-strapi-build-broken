module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("SERVER_HOST", "http://192.168.0.10/api/humus"),
  app: {
    keys: env.array("APP_KEYS"),
  },
});
