	const mongoose = require("mongoose");
	const Schema = mongoose.Schema;

	// Create Schema
	const VendorSchema = new Schema({
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
	    shopname: {
			type: String,
			required: true
		},
	    contact: {
			type: String,
			required: true
		},
	    opentime: {
			type: String,
			required: true
		},
	    closetime: {
			type: String,
			required: true
		},
		cooking:{
			type:Number,
		},	
		date:{
			type: Date,
			required: false
		}
	});

	module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
