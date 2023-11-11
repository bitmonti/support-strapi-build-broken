"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::showcase.showcase",
  ({ strapi }) => ({
    async find(ctx) {
      const { locale } = await this.sanitizeQuery(ctx);

      if (!locale) {
        return ctx.badRequest("locale is missing");
      }

      const [outline] = await strapi.entityService.findMany(
        "api::showcase.showcase",
        {
          locale,
          fields: ["id"],
          populate: {
            saman: {
              fields: ["title", "botanic", "brief", "alt_reg", "alt_eas"],
              populate: {
                image: { fields: ["formats"] },
                details: true,
              },
            },
          },
        }
      );

      // pick image formats
      const seed = {
        outline,
        saman: strapi.services["api::utils.utils"].sanitizeFormats(
          outline.saman
        ),
      };

      return seed ? seed : ctx.notFound("seed not found");
    },
  })
);
