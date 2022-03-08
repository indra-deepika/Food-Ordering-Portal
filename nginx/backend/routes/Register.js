var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Vendor = require("../models/Vendors");

// GET request 
// Getting all the users
router.get("/search", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
            console.log(users)
			res.json(users);
		}
	})
    Vendor.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})

});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/student", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        contact:req.body.contact,
        age:req.body.age,
        batch: req.body.batch,
        date: req.body.date,
        password:req.body.password,
        wallet:0
    });

    // console.log("KYA HUA");

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
router.post("/vendor", (req, res) => {
    const newVendor = new Vendor({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        shopname: req.body.shopname,
        contact:req.body.contact,
        opentime:req.body.opentime,
        closetime: req.body.closetime,
        cooking:0,
        date: req.body.date
    });
	// console.log("y this kolaveri");
    newVendor.save()
        .then(vendor => {
            res.status(200).json(vendor);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


// POST request 
// Login
router.post("/login", (req, res) => {
	const email = req.body.email;
	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            res.send("Email Found");
            return user;
        }
	});
});

router.post("/userfind", (req, res) => {
	const email = req.body.email;
	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        else{
            res.send("Email Found");
            return user;
        }
	});
});

module.exports = router;

            