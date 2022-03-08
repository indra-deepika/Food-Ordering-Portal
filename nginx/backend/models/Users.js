
// Was named Users.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
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
	contact:{
        type:String,
		required:true
	},
	age:{
		type: String	,	
		required:true
	},
	batch:{
        type: String,
		required: true
	},
	wallet:{
		type: Number,
		required:false
	},
	date:{
		type: Date,
		required: false
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
