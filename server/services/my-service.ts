import { Strapi } from '@strapi/strapi';
import {ChatOpenAI} from "@langchain/openai";
import {StringOutputParser} from "@langchain/core/output_parsers";
import {PromptTemplate} from "@langchain/core/prompts";

const getOpenAIInstance = () => {
  return new ChatOpenAI({
    modelName: "gpt-4o",
    streaming: false
  });
};

const service = ({ strapi }: { strapi: Strapi }) => ({
  async getAIGeneratedContent(text: string) {
    const llm = getOpenAIInstance();
    const template = `Summarize this text in an interesting way in less than 30 words,
       (Please always answer in the language that the user is speaking)
      *************************************************
      text: {text}
      answer: \`
      `;
    const prompt = PromptTemplate.fromTemplate(
      template
    );

    const chain = prompt
      .pipe(llm)
      .pipe(new StringOutputParser());

    const response = await chain.invoke({
      text: text
    });

    return { data: response };
  }
});

export default service;
