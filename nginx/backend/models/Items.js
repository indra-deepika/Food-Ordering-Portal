const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const  ItemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	rating: {
		type: Number,
		required: true
	},
	veg_non:{
        type:Boolean,
		required:true
	},
    vendor:{
        type:String,
		required:true
	},
    shopname:{
        type:String,
		required:true
	},
	noofbuyers:
	{
		type:Number
	},
	vendorid:{
		type: String,
		required:true
	},

});

module.exports = Item = mongoose.model("Items", ItemSchema);
