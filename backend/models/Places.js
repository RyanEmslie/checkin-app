const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const Schema = mongoose.Schema;

// Create Schema

const PlaceSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
});

module.exports = Place = mongoose.model("item", PlaceSchema);
