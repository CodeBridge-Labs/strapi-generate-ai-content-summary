import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.customFields.register({
      name: "ai-content-summary",
      pluginId: pluginId,
      type: "richtext",
      intlLabel: {
        id: "generate-ai-content-summary.ai-content-summary.label",
        defaultMessage: "Summary AI"
      },
      intlDescription: {
        id: "ai-text-generation.text-ai.description",
        defaultMessage: "Let AI do your writing!"
      },
      icon: PluginIcon,
      components: {
        Input: async () => import("./components/GenerateSummaryControl")
      },
      maxLength: 1000
    })
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
