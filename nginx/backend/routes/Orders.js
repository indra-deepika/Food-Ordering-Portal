var express = require("express");
var router = express.Router();

// Load User model
const Order = require("../models/Orders");


// GET request 
// Getting all the users
router.get("/search", function(req, res) {
    Order.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
            console.log(users)
			res.json(users);
		}
	})

});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/additem", (req, res) => {
    const newUser = new Item({

        fooditem:req.body.fooditem,
        cost: req.body.cost,
        rating:req.body.rating,
        time:req.body.time,
        vendorname: req.body.vendorname,
        shopname: req.body.shopname
    });

    newUser.save()
        .then(order => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.get("/edit", function(req, res) {
    const id = req.body.id;
    Order.findByIdandUpdate({_id:req.body.id},{
        fooditem:req.body.fooditem,
        cost: req.body.cost,
        rating: req.body.rating,
        quantity:req.body.quantity,
        vendorname: req.body.vendorname,
        time:req.body.time
    },function(err,order){
         if(err)
         res.send(err);
         else
         res.send("Done");
    });
  
});

module.exports = router;