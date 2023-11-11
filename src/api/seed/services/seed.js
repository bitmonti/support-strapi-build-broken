'use strict';

/**
 * seed service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::seed.seed');
