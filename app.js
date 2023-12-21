const express = require("express");
const axios = require("axios");

const { getChatGPTRecommendation } = require("./chatgptHandler");

require("dotenv").config();

const app = express();
app.use(express.json());

// being called from the core service
app.post("/recommend", async (req, res) => {
  try {
    const itineraryData = req.body; // change to extract the description
    const recommendation = await getChatGPTRecommendation(
      itineraryData["description"]
    );
    res.json({ recommendation });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing recommendation");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Recommender Service running on http://localhost:${PORT}`);
});
