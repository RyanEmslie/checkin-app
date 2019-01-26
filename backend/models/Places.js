const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const PlaceSchema = new Schema({
    id: {},
    name: {},
    lat: {},
    long: {},
    rating: {},
    decription: {},
    date: {}
});
