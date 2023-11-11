"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::blog.blog", ({ strapi }) => ({
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
      return { error: ctx.badRequest("id is missing") };
    }
    // query database
    const [outline] = await strapi.entityService.findMany("api::blog.blog", {
      publicationState: "live",
      locale: query.locale,
      filters: { slug },
      fields: ["title", "date"],
      populate: {
        image: {
          fields: ["formats"],
        },
        localizations: {
          fields: ["locale", "slug"],
        },
        body: {
          fields: ["alt_reg", "alt_eas", "reg", "eas"],
          populate: {
            image: { fields: ["formats", "name", "url", "ext", "mime"] },
            video: {
              fields: ["caption", "url", "mime", "alternativeText"],
            },
          },
        },
      },
    });

    const blog = {
      ...strapi.services["api::utils.utils"].sanitizeFormats(outline, [
        "medium",
        "small",
        "thumbnail",
      ]),
      body: strapi.services["api::utils.utils"].sanitizeFormats(outline.body),
    };
    return blog ? blog : ctx.notFound("blog not found");
  },

  async find(ctx) {
    const query = await this.sanitizeQuery(ctx);
    const key = strapi.services["api::utils.utils"].checkMissingParams(query, [
      "locale",
    ]);
    if (key) {
      return ctx.badRequest(`findOne: ${key}`);
    }
    // query database
    const outline = await strapi.entityService.findMany("api::blog.blog", {
      publicationState: "live",
      locale: query.locale,
      start: query.start,
      limit: query.limit,
      fields: ["title", "slug", "alt_reg", "alt_eas", "date"],
      sort: { date: "desc" },
      populate: {
        image: { fields: ["formats"] },
        body: {
          fields: ["id"],
          populate: {
            video: { fields: ["id"] },
            image: { fields: ["id", "ext"] },
          },
        },
      },
    });
    // pick image formats
    const blogs = strapi.services["api::utils.utils"].sanitizeFormats(outline, [
      "medium",
      "small",
      "thumbnail",
    ]);
    // count blog posts
    const total = await strapi.entityService.count("api::blog.blog", {
      publicationState: "live",
      locale: query.locale,
    });

    return blogs ? { total, blogs } : ctx.notFound("blogs not found");
  },
}));
