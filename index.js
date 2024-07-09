const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const route = require("./routes/route.js");
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

async function connectToMongoDB() {
  console.log(process.env.MONGO_URL, "MongoDB URL")
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb+srv://Hitec:4102EEwQODUEHJkZ@hitecdb.htrnbfc.mongodb.net/openai?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the function to connect to MongoDB
connectToMongoDB();


// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("MongoDb is connected"))
//   .catch((err) => console.log(err));

app.get("/api", (req, res) => {
  return res.json({
    success: true,
  });
});

app.use("/", route);

app.get("/welcome", (req, res) => {
  return res.json({
    success: true,
    message: "Welcome to Anycopy",
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
