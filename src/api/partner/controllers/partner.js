"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::partner.partner", ({ strapi }) => ({
  async find(ctx) {
    const outline = await strapi.entityService.findMany(
      "api::partner.partner",
      {
        fields: ["name", "website"],
        populate: {
          image: { fields: ["url"] },
        },
      }
    );

    return outline ? outline : ctx.notFound("partners not found");
  },
}));
