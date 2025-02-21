import { Strapi } from '@strapi/strapi';

const controller = ({ strapi }: { strapi: Strapi }) => ({
  async index(ctx) {
    ctx.body = await strapi
      .plugin('generate-ai-content-summary')
      // the name of the service file & the method.
      .service('service')
      .getAIGeneratedContent(ctx.request.body.text);
  },
});

export default controller;
