const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const  FavouriteSchema = new Schema({
	studentid: {
		type: String,
		required: true
	},
	itemname: {
		type: String,
		required: true,
	}

});

module.exports = Favourite = mongoose.model("Favourites", FavouriteSchema);