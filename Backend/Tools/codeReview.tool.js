import { GoogleGenerativeAI } from "@google/generative-ai";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { CODE_REVIEWER_SYSTEM_PROMPT } from "../Services/system_prompt.js";

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40, 
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

 const codeReview = async (prompt) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const systemMessage = `${CODE_REVIEWER_SYSTEM_PROMPT.instructions}\n\nNow, review the following code:`;


  await chatSession.sendMessage(systemMessage);

  const result = await chatSession.sendMessage(prompt);

  return result.response.text();
};


export const code_Reviewer = tool( 
  async ({ code }) => {
    return await codeReview(code);
  },
  {
    name: "code_Reviewer",
    description:
      "Analyzes a given code snippet and provides a structured code review with readability, maintainability, performance, and security feedback.",
    schema: z.object({
      code: z.string().describe("Code snippet to be reviewed"),
    }),
  }
);
 

export const code_Generator = tool( 
  async ({ prompt }) => {
    return await codeReview(prompt);
  },
  {
    name: "code_Generator",
    description:
      "Generates clean, efficient, and scalable code based on the given prompt, following industry best practices.",
    schema: z.object({
      prompt: z.string().describe("A prompt describing the desired code functionality"),
    }),
  }
);