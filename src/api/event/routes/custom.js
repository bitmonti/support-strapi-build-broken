"use strict";

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/events/search",
      handler: "event.findByIds",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/events/autocomplete",
      handler: "event.autocomplete",
      config: {
        policies: [],
      },
    },
  ],
};
