const { OpenAIApi, Configuration } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function getChatGPTRecommendation(itineraryData) {
  const prompt = createPrompt(itineraryData);

  // Call the ChatGPT API
  const response = await openai.createCompletion("text-davinci-003", {
    prompt: prompt,
    max_tokens: 150,
  });

  return response.data.choices[0].text;
}

function createPrompt(itineraryData) {
  return `I want you to act as an expert travel itinerary composer with more than 25 years of experience and make a detailed itinerary based on the following information: ${JSON.stringify(
    itineraryData
  )}`;
}

module.exports = {
  getChatGPTRecommendation,
  createPrompt,
};
