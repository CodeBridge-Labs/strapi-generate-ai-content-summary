import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'ai-content-summary',
    pluginId: 'generate-ai-content-summary',
    // @ts-ignore
    plugin: 'generate-ai-content-summary',
    type: 'string'
  });
};
