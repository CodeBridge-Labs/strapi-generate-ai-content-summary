"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller = ({ strapi }) => ({
    async index(ctx) {
        ctx.body = await strapi
            .plugin('generate-ai-content-summary')
            // the name of the service file & the method.
            .service('service')
            .getAIGeneratedContent(ctx.request.body.text);
    },
});
exports.default = controller;
