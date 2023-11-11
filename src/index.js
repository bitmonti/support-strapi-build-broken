"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    // strapi.db.lifecycles.subscribe({
    //   async afterCreate(event) {
    //     const title = event.params.data.title;
    //     await strapi.plugins['email'].services.email.send({
    //       to: 'mario@bitmonti.com',
    //       from: 'webmaster@humus-terra.com',
    //       replyTo: 'no-reply@humus-terra.com',
    //       subject: event.model.tableName,
    //       text: `Neuer Beitrag wurde erstellt: ${title}`,
    //       html: `<b>Neuer Beitrag wurde erstellt: ${title}</b>`,
    //     });
    //   },
    // });
  },
};
