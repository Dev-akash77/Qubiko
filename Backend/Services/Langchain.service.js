import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import {  temperature, weather } from "../Tools/weather.tool.js";
import { code_Reviewer,code_Generator } from "../Tools/codeReview.tool.js";
import { chatModel } from "../Models/chat.model.js";
import { SYSTEM_PROMPT } from './system_prompt.js';

//! ✅ Initialize Gemini LLM
const llm = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-flash",
  maxOutputTokens: 2000,
  apiKey: process.env.GOOGLE_API_KEY,
  systemMessage:SYSTEM_PROMPT, 
  streaming: true,
});

// !✅ Register Tools
const tools = [weather,temperature,code_Reviewer,code_Generator];
const llmWithTools = llm.bindTools(tools);

// !✅ Define LLM Call Node
async function llmCall(state) {
  try {
    const result = await llmWithTools.invoke([
      { role: "system", content:SYSTEM_PROMPT },
      ...state.messages, // !Ensure correct format
    ]);

    return {
      messages: [...state.messages, result], // !Append AI response
    };
  } catch (error) {
    console.error("Qubiko LLM Error:", error);
    return {
      messages: [
        ...state.messages,
        { role: "assistant", content: `Error processing request: ${error.message}` },
      ],
    };
  }
}
 
// !✅ ! Define Tool Execution Node
const toolNode = new ToolNode(tools);

// !✅ Define Conditional Logic
function shouldContinue(state) {
  const lastMessage = state.messages.at(-1);

  if (lastMessage?.tool_calls?.length > 0) {
    return "Action"; // !Proceed with tool execution
  }
  return "__end__"; // !End the workflow
}

// ! ✅ ! Build Workflow
const agentBuilder = new StateGraph(MessagesAnnotation)
  .addNode("llmCall", llmCall)
  .addNode("tools", toolNode)
  .addEdge("__start__", "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, {
    Action: "tools",
    __end__: "__end__",
  })
  .addEdge("tools", "llmCall") // ! Loop back after tool execution
  .compile();



// ! ✅ Ask Qubiko (Final API Function)


export const askQubiko = async (query, chatId) => {
  try {
    let conversationHistory = [];

    if (chatId) {
      const currentChat = await chatModel.findById(chatId);
      
      if (currentChat) {
        conversationHistory = currentChat.message.map(msg => [
          { role: "user", content: msg.question },
          { role: "assistant", content: msg.answer }
        ]).flat();
      }
    }

    if (conversationHistory.length > 20) {
      conversationHistory = conversationHistory.slice(-20);
    }

    conversationHistory.push({ role: "user", content: query });

    const result = await agentBuilder.invoke({
      messages: conversationHistory,
      context: { conversationHistory },
    });

    const aiResponse = result.messages.at(-1)?.content;
   
    return aiResponse;
  } catch (error) {
    console.error("Gemini Chat Memory Error:", error);
    return `Error: ${error.message}`;
  }
};





