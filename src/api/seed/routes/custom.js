"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/seeds/search",
      handler: "seed.findByIds",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/seeds/autocomplete",
      handler: "seed.autocomplete",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/seeds/populate",
      handler: "seed.populate",
      config: {
        policies: [],
      },
    },
  ],
};
