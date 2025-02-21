"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => {
    strapi.customFields.register({
        name: 'ai-content-summary',
        pluginId: 'generate-ai-content-summary',
        // @ts-ignore
        plugin: 'generate-ai-content-summary',
        type: 'string'
    });
};
