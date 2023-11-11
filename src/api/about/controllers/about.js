"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::about.about", ({ strapi }) => ({
  async find(ctx) {
    const outline = await strapi.entityService.findMany("api::about.about", {
      fields: ["id"],
      populate: {
        video: {
          fields: ["url", "caption"],
        },
        download: true,
      },
    });

    return outline ? outline : ctx.notFound("video not found");
  },
}));
