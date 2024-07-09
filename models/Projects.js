const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  project_name: {
    type: String,
    required: true,
  },
  collection_id: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Collection", required: true },
  ],
  description: {
    type: String,
    required: true,
  },
  audience: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        auto: true,
      },
      name: String,
    },
  ],
  key_words: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        auto: true,
      },
      name: String,
    },
  ],
});

module.exports = mongoose.model("Project", ProjectSchema);
