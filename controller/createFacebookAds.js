

require("dotenv").config();
const Openai = require('openai');

const openai = new Openai({
    apiKey: "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"
});


exports.faceBookAds = async (req, res) => {
    try {
        const { prompt, audience } = req.query
        // console.log(prompt);
        const promptData = `You are a skilled facebook ads creator  with generating facebook Ads copy for ${prompt}. with image,The target audience is ${audience}..Please create a one facebook Ads copy, the ads containing:
         -  headline(up to 30 characters each) - and one image related to ${prompt}`


        const responses = [];
        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: promptData },
                        {
                            type: "image_url",
                            image_url: {
                                "url": "",
                            },
                        },
                    ],
                },
            ],
        });
        console.log(response.choices[0]);
        res.status(200).json(responses);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
