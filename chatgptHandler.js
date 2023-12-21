const OpenAI = require("openai");

async function getChatGPTRecommendation(itineraryData) {
  let openai = _initOPENAI();

  const prompt = createPrompt(itineraryData);

  // Call the ChatGPT API
  console.log("Lets call the OpenAI API!");
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

  console.log(
    "Here is the response from gpt",
    response.choices[0].message.content
  );

  return response.choices[0].message.content;
}

function createPrompt(itineraryData) {
  return `Make a detailed itinerary for a 14 day vacation in Copenhagen`;
  // return `Make a detailed itinerary based on the following information: ${JSON.stringify(
  //   itineraryData
  // )}`;
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
