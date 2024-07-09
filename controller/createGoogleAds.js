

// require("dotenv").config();
// const Openai = require('openai');

// const openai = new Openai({
//     apiKey: "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"
// });


// exports.generateGoogleAds = async (req, res) => {
//     try {
//         const { prompt,audience } = req.query
//         console.log(prompt);
//         const promptData = `You are a skilled copywriter tasked with generating Google Ads copy for ${prompt}.The target audience is ${audience}.The key features and benefits are low cost with good product.Please create a one Google Ads copy, the ads containing:
//          -  headline(up to 30 characters each) - description(up to 90 characters)The copy should be attention - grabbing, highlight the unique selling points, and persuade the audience to click on the ad.Please format the output as follows: Headline: , Description:`


//         const responses = [];
//         for (let i = 0; i < 3; i++) {
//             const response = await openai.completions.create({
//                 model: 'gpt-3.5-turbo-instruct',
//                 prompt: `${prompt}`,
//                 max_tokens: 70
//             });
//             console.log(response);

//             const adText = response.choices[0].text.trim();

//             // Extracting headline and description
//             const [headline, description] = adText.split('\nDescription:');


//             const cleanedHeadline = headline.replace('Headline:', '').trim();
//             const cleanedDescription = description ? description.trim() : '';
//             console.log("headline:", cleanedHeadline, "desc:", cleanedDescription)


//             responses.push({ headline: cleanedHeadline, description: cleanedDescription });
//         }
//         res.status(200).json(responses);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }


const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = "https://anycopyopenai.openai.azure.com/";
const azureApiKey = "0edf07bfd3404b17b4626fea182f04b6";

const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
    { role: "assistant", content: "Yes, customer managed keys are supported by Azure OpenAI" },
    { role: "user", content: "Do other Azure AI services support this too" },
];

exports.generateGoogleAds = async (req, res) => {
    try {
        
        console.log("== Chat Completions Sample ==");
    
        const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
        const deploymentId = "gpt-35-turbo";
        const result = await client.getChatCompletions(deploymentId, messages);
    
        for (const choice of result.choices) {
            console.log(choice.message);
        }
    }
    
    catch (error) {
        console.error("The sample encountered an error:", error);
    }
}


