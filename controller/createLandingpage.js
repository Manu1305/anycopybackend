exports.generateLandingPage = async (req, res) => {
  try {
    const {  audience, benifits, features, topics, } = req.query;
    console.log(prompt);
      const promptData = `You are a skilled landing page creator  here we need to create a landing page for  ${topics}.The target audience is ${audience}.it should be attracitve and creative : the features are ${features} and the benift ${benifits}
         -  heading(up to 15 characters each) - subheading(up to 25 charcters)The page should be attention - grabbing, highlight the unique selling points,  and create a button with atractive words.Please format the output as follows: Headline: , subheading: button name`;

    const responses = [];
    for (let i = 0; i < 3; i++) {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `${promptData}`,
        max_tokens: 70,
      });
      console.log(response);

      const adText = response.choices[0].text.trim();

      // Extracting headline and description
      const [headline, description,button] = adText.split("\nDescription:");

      const cleanedHeadline = headline.replace("Headline:", "").trim();
      const cleanedDescription = description ? description.trim() : "";
        const Button = button ? button.trim() : "";
      console.log("headline:", cleanedHeadline, "desc:", cleanedDescription, "button:", button );

      responses.push({
        headline: cleanedHeadline,
        description: cleanedDescription,
          button: Button
      });
    }
    res.status(200).json(responses);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
