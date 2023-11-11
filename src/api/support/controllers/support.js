"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::support.support", ({ strapi }) => ({
  async find(ctx) {
    const outline = await strapi.entityService.findMany(
      "api::support.support",
      {
        fields: [
          "name",
          "owner",
          "iban_eur",
          "iban_ron",
          "cif",
          "cui",
          "swift",
        ],
      }
    );

    return outline ? outline : ctx.notFound("bank details not found");
  },
}));
