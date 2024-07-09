
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const endpoint = "https://anycopyopenai.openai.azure.com/";
const azureApiKey = "0edf07bfd3404b17b4626fea182f04b6";

const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
    { role: "assistant", content: "Yes, customer managed keys are supported by Azure OpenAI" },
    { role: "user", content: "Do other Azure AI services support this too" },
];

exports.amazonAds= async (req, res) => {
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
