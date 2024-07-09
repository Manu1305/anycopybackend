const OpenAI = require("openai");
require("dotenv").config();



const openai = new OpenAI({ apiKey: "sk - wW3fqkV9PCelAYpY7SSkT3BlbkFJ5YZ8y6DxAF5Gj0Ryd7XP" });
exports.chatStreaming = async function (req, res) {
  const { input } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });
    console.log(response.choices,"response");
    res.send(response.choices[0].message);
  } catch (error) {
    console.error("Error:", error.message);
    return "Sorry, I am unable to respond at the moment.";
  }
};