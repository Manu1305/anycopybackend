const axios = require("axios");
require("dotenv").config();
const { OpenAI } = require("openai");
const MAX_CONTENT_LENGTH = 10000;
const openai = new OpenAI({ apiKey: "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" });

// Example function to extract keywords from content
async function extractKeywords(fullContent) {
  try {
    const content = fullContent.slice(0, MAX_CONTENT_LENGTH);
    // Generate keywords using OpenAI
    const prompt = `Extract main keywords from the following content:\n\n${content}`;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    // Dummy implementation: Split content into words and use as keywords
    const words = response.choices[0].message;
    return words; // Consider first 5 words as keywords
  } catch (error) {
    throw new Error(`Error extracting keywords: ${error.message}`);
  }
}

// Example function to generate ads for each platform
async function generateAd(platform, keywords, images, language, project, url) {
  try {
    const prompt = `Generate ad copy for ${platform} platform promoting ${project} project, add this ${url} link also in add, show responce in ${language} language, And Incorporate the following keywords: "${keywords}". Avoid including [object Promise] in the response.`;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    const adCopy = response.choices[0].message;
    // Generate ad text with image
    const adText = {
      platform,
      adCopy,
      images: images[0],
    };
    return adText;
  } catch (error) {
    throw new Error(`Error generating ad for ${platform}: ${error.message}`);
  }
}

exports.generateAdsApi = async (req, res) => {
  try {
    const { name } = req.params;
    const { url, language, project } = req.body;
    // Fetch content from the URL
    const { data: content } = await axios.get(url);
    // Extract images from content
    const images = content
      .match(/<img[^>]+src="([^">]+)"/g)
      .map((img) => img.match(/src="([^"]+)"/)[1]);

    const keywords = extractKeywords(content);
    if (name === "Google") {
      ads = await generateAd(
        "Google",
        keywords,
        images,
        language,
        project,
        url
      );
      return res.json(ads);
    } else if (name === "Facebook") {
      ads = await generateAd(
        "Facebook",
        keywords,
        images,
        language,
        project,
        url
      );
      return res.json(ads);
    } else if (name === "Twitter") {
      ads = await generateAd(
        "Twitter",
        keywords,
        images,
        language,
        project,
        url
      );
      return res.json(ads);
    } else {
      ads = await generateAd(
        "LinkedIn",
        keywords,
        images,
        language,
        project,
        url
      );
      return res.json(ads);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};