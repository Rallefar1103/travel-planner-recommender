const OpenAI = require("openai");

async function getChatGPTRecommendation(itineraryData) {
  let openai = _initOPENAI();

  const prompt = createPrompt(itineraryData);

  // Call the ChatGPT API
  console.log("CALLING OpenAI API!");
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an expert travel itinerary composer with over 25 years of experience.",
      },
      { role: "user", content: prompt },
    ],
    model: "gpt-3.5-turbo",
  });

  return response.choices[0].message.content;
}

function createPrompt(itineraryData) {
  let destination = itineraryData.destination;
  let duration = itineraryData.duration;
  let budget = itineraryData.budget;
  let attractions = itineraryData.attractions;
  let restaurant = itineraryData.restaurant.name;

  console.log("Restaurant for itinerary: ", restaurant);

  return `Make a detailed itinerary for a ${duration} hour vacation in ${destination} with a budget of ${budget} $ 
  focusing on this type of ${attractions} and this specific restaurant for dinner ${restaurant}. Your response should
  just start with the first activity - no title, budget or other information in the beginning`;
}

function _initOPENAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

module.exports = {
  getChatGPTRecommendation,
  createPrompt,
};
