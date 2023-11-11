"use strict";

const { createCoreController } = require("@strapi/strapi").factories;
const LAST_TWO_YEARS = new Date().getFullYear() - 2;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  async findOne(ctx) {
    const query = await this.sanitizeQuery(ctx);
    const key = strapi.services["api::utils.utils"].checkMissingParams(query, [
      "locale",
    ]);
    if (key) {
      return ctx.badRequest(`findOne: ${key}`);
    }
    const { id: slug } = ctx.params;
    if (slug === "undefined") {
      return ctx.badRequest("id is missing");
    }
    // query database
    const [outline] = await strapi.entityService.findMany("api::event.event", {
      locale: query.locale,
      publicationState: "live",
      filters: { slug },
      fields: ["title", "date", "alt_reg", "alt_eas", "sold"],
      populate: {
        image: { fields: ["formats"] },
        localizations: { fields: ["locale", "slug"] },
        details: true,
        description: true,
        tip: true,
        price: true,
        contact: true,
      },
    });

    const events = strapi.services["api::utils.utils"].sanitizeFormats(outline);

    return events ? events : ctx.badRequest("event not found");
  },

  async find(ctx) {
    const query = await this.sanitizeQuery(ctx);
    const key = strapi.services["api::utils.utils"].checkMissingParams(query, [
      "locale",
    ]);
    if (key) {
      return ctx.badRequest(`find: ${key}`);
    }
    // query database
    const outline = await strapi.entityService.findMany("api::event.event", {
      publicationState: "live",
      locale: query.locale,
      fields: ["title", "slug", "date", "alt_reg", "alt_eas", "sold"],
      sort: { date: "desc" },
      filters: { date: { $gt: `${LAST_TWO_YEARS}-12-31` } },
      populate: { image: { fields: ["formats"] } },
    });
    // pick image formats
    const events = outline.map((events) =>
      strapi.services["api::utils.utils"].sanitizeFormats(events, [
        "medium",
        "small",
        "thumbnail",
      ])
    );

    return events ? events : ctx.badRequest("no events found");
  },

  async findByIds(ctx) {
    console.log("fire");
    const query = await this.sanitizeQuery(ctx);
    const key = strapi.services["api::utils.utils"].checkMissingParams(query, [
      "locale",
      "ids",
    ]);
    if (key) {
      return ctx.badRequest(`findByIds: ${key}`);
    }
    // query database
    const parcels = query.ids.split(",");
    const outline = await Promise.all(
      parcels.map(
        async (id) =>
          await strapi.entityService.findOne("api::event.event", id, {
            locale: query.locale,
            filters: {
              id: { $contains: id },
            },
            fields: ["title", "slug", "date", "sold"],
            sort: { date: "desc" },
            populate: {
              image: { fields: ["formats"] },
            },
          })
      )
    );
    return strapi.services["api::utils.utils"].sanitizeFormats(outline);
  },

  async autocomplete(ctx) {
    const query = await this.sanitizeQuery(ctx);
    const key = strapi.services["api::utils.utils"].checkMissingParams(query, [
      "locale",
    ]);
    if (key) {
      return ctx.badRequest(`findByIds: ${key}`);
    }
    // query database
    const outline = await strapi.entityService.findMany("api::event.event", {
      publicationState: "live",
      locale: query.locale,
      fields: ["title", "slug", "date"],
      filters: { date: { $gt: `${LAST_TWO_YEARS}-12-31` } },
      sort: { date: "desc" },
    });

    return outline ? outline : ctx.notFound("autocomplete failed");
  },
}));
