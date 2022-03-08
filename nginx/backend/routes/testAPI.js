var express = require("express");
var router = express.Router();

// GET request 
// Just a test API to check if server is working properly or not
// router.get("/", function(req, res) {
// 	res.send("API is working properly !");
// });
const Vendor = require("../models/Vendors");
const Item = require("../models/Items");

router.post("/vendor/items", function(req, res) {
    console.log("WE ARE HERE");
    const id = req.body.id;
    // GET THE ID OF THE VENDOR
    Item.findAll({vendorid:id}).then(item=>{
     res.json(item);
    })
});
// // Getting all the users
// router.get("/", function(req, res) {
//     Vendor.find(function(err, users) {
// 		if (err) {
// 			console.log(err);
// 		} else {
//             console.log("y this kolaveri");
// 			res.json(users);
// 		}
// 	})
// });


// // Add a user to db
// router.post("/register", (req, res) => {
//     const newVendor = new Vendor({
//         name: req.body.name,
//         email: req.body.email,
//         contact:req.body.contact,
//         shopname:req.body.shopname,
//         closetime: req.body.closetime,
//         opentime:req.body.opentime,
//         date: req.body.date
//     });

//     newVendor.save()
//         .then(user => {
//             res.status(200).json(user);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
// });     

module.exports = router;
