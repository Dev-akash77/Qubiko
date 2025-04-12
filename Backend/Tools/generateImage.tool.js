import { tool } from "@langchain/core/tools";
import fetch from "node-fetch";
import { Buffer } from "buffer";
import { v2 as cloudinary } from "cloudinary";
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

    //! Convert the image to a buffer
    const imageBuffer = Buffer.from(await response.arrayBuffer());

    //! Upload the image buffer to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "qubiko_generated_images", 
          resource_type: "image",  
          public_id: `image_${Date.now()}`, 
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result); 
        }
      );
      stream.end(imageBuffer);
    });

    return result.secure_url;
    
  } catch (error) {
    // Log and return a detailed error message
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
     