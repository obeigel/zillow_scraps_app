'use strict';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var ZillowRentals = new Schema({
    zestimate: Number,
    price: Number,
    postal_code: Number,
    address: String,
    date: Date,
    ztype: String,
    info: String,
    title: String,
    url: String,
    longitude: Number,
    latitude: Number,
    zpid: Number
});

module.exports = mongoose.model('rentals', ZillowRentals);
