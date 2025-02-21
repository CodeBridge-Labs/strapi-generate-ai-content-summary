# Strapi plugin generate-ai-content-summary

takes content object from scoped content-types to generate a summary of 35 words made by ai

Make sure to

- have a env variable for OpenAI `OPENAI_API_KEY`
- Works with strapi 4 (Tested in 4.13.6)
- Call your object where `generate-ai-content-summary` will take the data in text as `content`
- Import this plugin as content-type

### Important
This plugin only will generate a paragraph of ~35 words




