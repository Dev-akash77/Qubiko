import { tool } from "@langchain/core/tools";
import fetch from "node-fetch";
import { Buffer } from "buffer";
import { z } from "zod";

const API_KEY = process.env.HUGGING_FACE_API_KEY;

export const imageGeneration = async (prompt) => {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }), 
      } 
    ); 

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}: ${await response.text()}`);
    }

    const contentType = response.headers.get("content-type") || "image/png";

    // ! Convert response to Buffer
    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    // !✅ Return Base64 Image (frontend can use directly) 
    return  `data:${contentType};base64,${base64Image}`
  } catch (error) {
    console.error("Image Generation Error:", error.message);
    return { success: false, error: error.message }; 
  } 
}; 
  
  
 

export const generate_image = tool(  
  async ({ imagePrompt }) => {
    return await imageGeneration(imagePrompt);
  },
  {
    name: "generate_image",
    description: "Generates an image based on the given prompt.",
    schema: z.object({
      imagePrompt: z.string().describe("Describe the image to generate"),
    }), 
  }
);
     