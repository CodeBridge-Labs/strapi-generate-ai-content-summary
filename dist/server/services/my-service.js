"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("@langchain/openai");
const output_parsers_1 = require("@langchain/core/output_parsers");
const prompts_1 = require("@langchain/core/prompts");
const getOpenAIInstance = () => {
    return new openai_1.ChatOpenAI({
        modelName: "gpt-4o",
        streaming: false
    });
};
const service = ({ strapi }) => ({
    async getAIGeneratedContent(text) {
        const llm = getOpenAIInstance();
        const template = `Summarize this text in an interesting way in less than 30 words,
       (Please always answer in the language that the user is speaking)
      *************************************************
      text: {text}
      answer: \`
      `;
        const prompt = prompts_1.PromptTemplate.fromTemplate(template);
        const chain = prompt
            .pipe(llm)
            .pipe(new output_parsers_1.StringOutputParser());
        const response = await chain.invoke({
            text: text
        });
        return { data: response };
    }
});
exports.default = service;
