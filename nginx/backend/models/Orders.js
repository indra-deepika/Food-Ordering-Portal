const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const  OrderSchema = new Schema({
	
	quantity:{
        type:Number,
		required:true
	},
	cost:{
		type:Number,
        required:true
	},
    itemid:{
        type:String,
		required:true
	},
	studentid:{
        type:String,
		required:true
	},
	vendorid:{
        type:String,
		required:true
	},
	itemname:{
        type:String,
		required:true
	},
	status:{
		type:String,
		required:true
	},
    time:{
        type:Date,  
		required:false
	}

});

module.exports = Order = mongoose.model("Orders", OrderSchema);
