const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');   
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "saav"

// routes
var testAPIRouter = require("./routes/testAPI");
var RegisterRouter = require("./routes/Register");
var LoginRouter = require("./routes/Login");
var VendorRouter = require("./routes/Vendor");
var StudentRouter = require("./routes/Student");

// allows request across the regions (cors)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb+srv://deepika:deepika@cluster0.swhus.mongodb.net/deeps?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/register",RegisterRouter);
app.use("/loginREG",LoginRouter);
app.use("/vendor",VendorRouter);
app.use("/student",StudentRouter);



app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
    