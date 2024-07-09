const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a customer
const customer = await stripe.customers.create({
  email: 'keshrahul1990@gmail.com',
  source: 'tok_visa', // You'd replace this with the actual payment method obtained from frontend
});

// Subscribe the customer to a plan
const subscription = await stripe.subscriptions.create({
  customer: customer.id,
  items: [{ plan: 'plan_ID' }], // Replace 'plan_ID' with your actual plan ID
});
