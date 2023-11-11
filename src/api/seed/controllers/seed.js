"use strict";
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::seed.seed", ({ strapi }) => ({
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
      return ctx.badRequest("findOne: id is missing");
    }
    // query database
    const [outline] = await strapi.entityService.findMany("api::seed.seed", {
      publicationState: "live",
      locale: query.locale,
      filters: { slug },
      fields: ["title", "alt_reg", "alt_eas", "botanic", "brief"],
      populate: {
        image: { fields: ["formats"] },
        localizations: { fields: ["locale", "slug"] },
        details: true,
      },
    });
    // pick image formats
    const seed = strapi.services["api::utils.utils"].sanitizeFormats(outline);

    return seed ? seed : ctx.notFound("seed not found");
  },

  async find(ctx) {
    const query = await this.sanitizeQuery(ctx);
    const key = strapi.services["api::utils.utils"].checkMissingParams(query, [
      "locale",
      "start",
      "limit",
    ]);
    if (key) {
      return ctx.badRequest(`find: ${key}`);
    }
    // query database
    const categories = await strapi.entityService.findMany(
      "api::category.category",
      {
        publicationState: "live",
        locale: query.locale,
        fields: ["title"],
        populate: { samen: true },
      }
    );

    if (!categories.length) {
      return ctx.notFound("categories not found");
    }

    const categoriesWithSeeds = categories.filter(
      (category) => category.samen.length
    );

    if (!categoriesWithSeeds.length) {
      return ctx.notFound("categories with seeds not found");
    }

    const seeds = await Promise.all(
      categoriesWithSeeds.map(async (category) => ({
        id: category.id,
        title: category.title,
        total: await strapi.entityService.count("api::seed.seed", {
          publicationState: "live",
          locale: query.locale,
          filters: { categories: { id: category.id } },
        }),
        ...(await findSeedById({ id: category.id, ...query })),
      }))
    );

    return seeds ? seeds : ctx.notFound("seeds not found");
  },

  async findByIds(ctx) {
    const query = await this.sanitizeQuery(ctx);
    const key = strapi.services["api::utils.utils"].checkMissingParams(query, [
      "locale",
      "ids",
    ]);
    if (key) {
      return ctx.badRequest(`findByTerm: ${key}`);
    }
    // query database
    const parcels = query.ids.split(",");
    const outline = await Promise.all(
      parcels.map(
        async (id) =>
          await strapi.entityService.findOne("api::seed.seed", id, {
            locale: query.locale,
            publicationState: "live",
            fields: ["title", "slug", "botanic", "brief"],
            populate: {
              image: { fields: ["formats"] },
            },
          })
      )
    );

    // pick image formats
    const seeds = strapi.services["api::utils.utils"].sanitizeFormats(outline, [
      "small",
      "thumbnail",
    ]);

    return seeds;
  },

  async autocomplete(ctx) {
    const query = await this.sanitizeQuery(ctx);
    const key = strapi.services["api::utils.utils"].checkMissingParams(query, [
      "locale",
    ]);
    if (key) {
      return ctx.badRequest(`autocomplete: ${key}`);
    }
    // query database
    const outline = await strapi.entityService.findMany("api::seed.seed", {
      publicationState: "live",
      locale: query.locale,
      fields: ["title", "brief", "slug"],
      populate: {
        categories: {
          fields: ["title"],
        },
      },
    });
    // pull out category.title
    const autocomplete = outline.map((item) => ({
      ...item,
      categories: item.categories.map(({ title }) => title),
    }));

    return autocomplete ? autocomplete : ctx.notFound("autocomplete error");
  },

  async populate(ctx) {
    const query = await this.sanitizeQuery(ctx);
    const key = strapi.services["api::utils.utils"].checkMissingParams(query, [
      "id",
      "start",
      "limit",
    ]);
    if (key) {
      return ctx.badRequest(`populate: ${key}`);
    }
    // query database
    const outline = await findSeedById({ ...query });

    return outline ? outline : ctx.notFound("pagination failed");
  },
}));

const findSeedById = async ({ id, start, limit }) => {
  const outline = await strapi.entityService.findOne(
    "api::category.category",
    id,
    {
      fields: ["id"],
      populate: {
        samen: {
          publicationState: "live",
          start,
          limit,
          fields: ["title", "alt_reg", "alt_eas", "slug", "botanic", "brief"],
          populate: {
            image: { fields: ["formats"] },
          },
        },
      },
    }
  );
  return {
    ...outline,
    samen: strapi.services["api::utils.utils"].sanitizeFormats(outline.samen, [
      "small",
      "thumbnail",
    ]),
  };
};
