const express = require("express");
const axios = require("axios");

const { getChatGPTRecommendation } = require("./chatgptHandler");

require("dotenv").config();

const app = express();
app.use(express.json());

// being called from the core service
app.post("/recommend", async (req, res) => {
  console.log("WELCOME TO THE RECOMMENDER SYSTEM!!");
  try {
    const itineraryData = req.body;
    const recommendedItinerary = await getChatGPTRecommendation(itineraryData);

    res.json({ recommendedItinerary });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing recommendation");
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Recommender Service running on http://localhost:${PORT}`);
});
