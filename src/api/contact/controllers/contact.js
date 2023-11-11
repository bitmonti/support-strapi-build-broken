"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::contact.contact", ({ strapi }) => ({
  async find(ctx) {
    const query = await this.sanitizeQuery(ctx);

    for (const key in query) {
      if (query[key] === "undefined") {
        return ctx.badRequest(`${key} is missing`);
      }
    }

    const outline = await strapi.entityService.findMany(
      "api::contact.contact",
      {
        locale: query.locale,
        fields: ["name", "street", "zip", "location", "maps"],
        populate: {
          email: true,
          phone: true,
        },
      }
    );

    return outline ? outline : ctx.notFound("contact not found");
  },
}));
