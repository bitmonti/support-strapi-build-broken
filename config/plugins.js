module.exports = ({ env }) => {
  return {
    translate: {
      enabled: true,
      config: {
        provider: "deepl",
        providerOptions: {
          apiKey: env("DEEPL_API_PROFESSIONAL"),
          apiUrl: env("DEEPL_API_URL"),
        },
      },
    },
  };
};
