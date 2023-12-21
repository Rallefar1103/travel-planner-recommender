async function getChatGPTRecommendation(itineraryData) {
  const prompt = createPrompt(itineraryData);
  const url = process.env.OPEN_API_URL;

  // Call the ChatGPT API
  const response = await axios.post(
    url,
    {
      prompt: prompt,
      max_tokens: 150,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );

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
