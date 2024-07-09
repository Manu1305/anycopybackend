const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema({
    collection_name : {
        type: String,
        required: true
    },
    projects:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ]
},{timestamps:true});

module.exports = mongoose.model('Collection', collectionSchema);