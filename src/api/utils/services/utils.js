"use strict";

module.exports = () => ({
  sanitizeFormats(
    payload,
    formats = ["large", "medium", "small", "thumbnail"]
  ) {
    if (!payload) {
      return;
    }

    return payload?.length
      ? payload.map((item) => provide(item, formats))
      : provide(payload, formats);

    function provide(payload, formats) {
      const firstFormat = formats.find((key) => payload?.image?.formats?.[key]);

      return firstFormat
        ? {
            ...payload,
            image: payload?.image?.formats[firstFormat],
          }
        : payload;
    }
  },

  checkMissingParams(query, keys) {
    for (const key in keys) {
      if (!JSON.stringify(query).includes(keys[key])) {
        return `param "${keys[key]}" is missing`;
      }
      if (query[keys[key]] === "undefined") {
        return `param "${keys[key]}" is undefined`;
      }
    }
  },
});
