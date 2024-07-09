const stripe = require("stripe");

exports.upgradPlan = async (req, res) => {
  try {
    const { priceId } = req.body;
    if (!priceId) {
      return res.status(400).json({
        success: false,
        message: "priceId is not found",
      });
    }
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const stripe = require("stripe")(stripeKey);
    const session = await stripe.checkout.sessions.create({
      success_url: "https://anycopy.co/",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
    });
    return res.status(200).json({ url: session.url });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
