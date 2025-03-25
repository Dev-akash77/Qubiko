import { tool } from "@langchain/core/tools";
import axios from "axios";
import { z } from "zod";

const api_key = process.env.WEATHER_API_KEY;
const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

 const fetchWeather = async (city) => {
  if (!api_key) throw new Error("Weather API key is missing.");
  if (!city) "please provide city name";

  try {
    const response = await api.get(`/weather?q=${city}&appid=${api_key}`);

    const { main, weather, name, wind } = response.data;
    const temperature = Math.trunc(main.temp - 273.15); // !Convert from Kelvin to Celsius
    const description = weather[0].description;
    const humidity = main.humidity;
    const windSpeed = wind.speed;

    return `City: ${name}, Temperature: ${temperature}°C, Humidity: ${humidity}%, Wind Speed: ${windSpeed} m/s, Description: ${description}`;
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    return {
      error:
        "Unable to fetch weather data. Please check the city name or try again later.",
    };
  }
};



// ! tool

export const weather = tool(
  async ({ city }) => {
    return await fetchWeather(city);
  },
  {
    name: "weather",
    description: "Fetch the current temperature for a given city. Example: 'temperature in {city}'. Converts Celsius to Fahrenheit when needed.",
    schema: z.object({
      city: z.string().describe("Name of the city"),
    }),
  }
);
 
export const temperature = tool(
  async ({ city }) => {
    return await fetchWeather(city);
  },
  {
    name: "temperature",
    description: "Fetch the current temperature for a given city. Example: 'temperature in {city}'. Converts Celsius to Fahrenheit when needed.",
    schema: z.object({
      city: z.string().describe("Name of the city"),
    }),
  }
);