var express = require("express");
const Items = require("../models/Items");
var router = express.Router();

// Load User model

const Item = require("../models/Items");

const Vendor = require("../models/Vendors");



// Finding the vendor with id 

router.post("/find", function (req, res) {

    const id = req.body._id;

    console.log(":()()");
    // GET THE ID OF THE VENDOR
    Vendor.findOne({ _id: id }).then(vendor => {
        if (!vendor) {

            console.log(":((  couldnot find vendor");
        }
        else {
            res.send(vendor);
            return vendor;

        }
    })
});


router.post("/delete", function (req, res) {

    const id = req.body._id;

    console.log(":()()");
    // GET THE ID OF THE VENDOR
    Vendor.findOneAndDelete({ _id: id }).then(vendor => {
        if (!vendor) {

            console.log(":((  couldnot find vendor");
        }
        else {
            res.send(vendor);
            return vendor;

        }
    })
});


router.post("/edit", function (req, res) {
    const id = req.body._id;

    Vendor.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        contact: req.body.contact,
        opentime: req.body.opentime,
        closetime: req.body.closetime,
        shopname: req.body.shopname,
        password: req.body.password,

    }, function (err, docs) {
        if (err) res.send(err);
        else {
            res.send("Updated");
        }

    });
})

// GETTING ALL THE ITEMS OF THE VENDOR

router.post("/items", function (req, res) {
    console.log("WE ARE HERE LOL");

    const id = req.body.id;
    // GET THE ID OF THE VENDOR
    Item.find({ vendorid: id }).then(item => {
        res.send(item);
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a item to a vendor list
router.post("/item/additem", (req, res) => {

    const id = req.body.vendorid;


    // console.log(":)) SHabash");
    // console.log(req.body.name);
    // console.log(req.body.price);
    // console.log(req.body.veg_non);
    // console.log(req.body.vendor);
    // console.log(req.body.shopname);
    // console.log(id);

    const newUser = new Item({
        name: req.body.name,
        price: req.body.price,
        rating: 0,
        veg_non: req.body.veg_non,
        vendor: req.body.vendor,
        shopname: req.body.shopname,
        vendorid: id,
        nofofbuyers: parseInt(0)

    });

    console.log(":)) SHabash2");
    // console.log("KYA HUA");

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });


});

router.post("/item/delitem", (req, res) => {

    const id = req.body._id;

    // GET THE ID OF THE VENDOR
    Item.findOneAndDelete({ _id: id }).then(item => {
        if (!item) {

            console.log(":((  couldnot find the item");
        }
        else {
            res.send(item);
            return item;

        }
    })

});


router.post("/order/find", (req, res) => {

    const id = req.body.id;
    console.log("order find");

    // Items of the vendor
    var final = [];
    var finals;
    Order.find({ vendorid: id }).then(item => {
        // console.log(item);
        res.send(item);

    })

});


router.post("/order/reject", function (req, res) {
    const id = req.body.id;
    console.log(id);
    console.log("in delete");
    // Order.findOneAndDelete({ _id: id }).then(item => {
    //     if (!item) {

    //         console.log(":((  couldnot find the order");
    //     }
    //     else {
    //         res.send(item);
    //         return item;

    //     }
    // })
    Order.findByIdAndUpdate({ _id: id }, {
        itemname: req.body.itemname,
        quantity: req.body.quantity,
        cost: req.body.cost,
        studentid: req.body.studentid,
        vendorid: req.body.vendorid,
        itemid: req.body.itemid,
        status: "rejected"

    }, function (err, docs) {
        if (err) res.send(err);
        else {

            res.send("Updated");
            return;
        }
    })


})

router.post("/order/update", function (req, res) {
    const id = req.body.id;
    console.log("order update");
    console.log(id);
    console.log(req.body.status);
    if (req.body.status == "placed") {
        // alert("Change to Accepted");
        console.log("chnage to accepted")
        console.log("here");
        Order.findByIdAndUpdate({ _id: id }, {
            itemname: req.body.itemname,
            quantity: req.body.quantity,
            cost: req.body.cost,
            studentid: req.body.studentid,
            vendorid: req.body.vendorid,
            itemid: req.body.itemid,
            status: "accepted"

        }, function (err, docs) {
            if (err) res.send(err);
            else {
                // res.send("Updated");
                // return;
                Vendor.findOne({ _id: req.body.vendorid }).then(item => {
                    if (!item) {

                        // console.log(":((  couldnot find the item");
                    }
                    else {

                        console.log("found vendor")
                   
                        Vendor.findByIdAndUpdate({ _id: req.body.vendorid }, {
                    
                            name: item.name,
                            contact: item.contact,
                            opentime: item.opentime,
                            closetime: item.closetime,
                            shopname: item.shopname,
                            password: item.password,
                            cooking: item.cooking+1

                    
                        }, function (err, docs) {
                            if (err);
                    
                        });

                        // res.send(item);
                        // return item;

                    }
                }) 
                res.send("Updated");
                return;
            }

        });
    }
    else if (req.body.status == "accepted") {
        // alert("Change to Coooking");

         console.log("Change to cooking");
        Order.findByIdAndUpdate({ _id: id }, {
            itemname: req.body.itemname,
            quantity: req.body.quantity,
            cost: req.body.cost,
            studentid: req.body.studentid,
            vendorid: req.body.vendorid,
            itemid: req.body.itemid,
            status: "cooking"

        }, function (err, docs) {
            if (err) ;
            else {

              
            }


        });
    }
    else if (req.body.status == "cooking") {
        // alert("Change to Ready For Pick up");
         console.log("Change to ready for pick up");
        Order.findByIdAndUpdate({ _id: id }, {
            itemname: req.body.itemname,
            quantity: req.body.quantity,
            cost: req.body.cost,
            studentid: req.body.studentid,
            vendorid: req.body.vendorid,
            itemid: req.body.itemid,
            status: "ready for pick up"

        }, function (err, docs) {
            if (err) ;
            else {
                console.log("found vendor")
                Vendor.findOne({ _id: req.body.vendorid }).then(item => {
                    if (!item) {

                        // console.log(":((  couldnot find the item");
                    }
                    else {
                   
                        Vendor.findByIdAndUpdate({ _id: req.body.vendorid }, {
                    
                            name: item.name,
                            contact: item.contact,
                            opentime: item.opentime,
                            closetime: item.closetime,
                            shopname: item.shopname,
                            password: item.password,
                            cooking: parseInt(item.cooking)-1

                    
                        }, function (err, docs) {
                    
                        });

                        // res.send(item);
                        // return item;

                    }
                })
               
                res.send("Updated");
                return;
            }

        });
    }
    else {
        // alert("Error");
        res.send("Error");
    }

})

router.post("/item/updatebuy", function (req, res) {
    const id = req.body.itemid;
    const noofbuyers = req.body.noofbuyers;
    Item.find({ _id: id }).then(item => {

        console.log("update no buyers")

        // console.log(item[0]);
        // console.log(item[0].name);

        Item.findByIdAndUpdate({ _id: id }, {
            name: item[0].name,
            price: item[0].price,
            rating: item[0].rating,
            veg_non: item[0].veg_non,
            vendor: item[0].vendor,
            shopname: item[0].shopname,
            noofbuyers: noofbuyers,
            vendorid: item[0].vendorid
        }, function (err, docs) {
            if (err) res.send(err);
            else {
                res.send("Updated");
                return;
            }
        });


    });

})








// router.post("/vendor", (req, res) => {
//     const newVendor = new Vendor({
//         name: req.body.name,
//         password: req.body.password,
//         email: req.body.email,
//         shopname: req.body.shopname,
//         contact:req.body.contact,
//         opentime:req.body.opentime,
//         closetime: req.body.closetime,
//         date: req.body.date
//     });
// 	// console.log("y this kolaveri");
//     newVendor.save()
//         .then(vendor => {
//             res.status(200).json(vendor);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
// });


// // POST request 
// // Login
// router.post("/login", (req, res) => {
// 	const email = req.body.email;
// 	// Find user by email
// 	User.findOne({ email }).then(user => {
// 		// Check if user email exists
// 		if (!user) {
// 			return res.status(404).json({
// 				error: "Email not found",
// 			});
//         }
//         else{
//             res.send("Email Found");
//             return user;
//         }
// 	});
// });

// router.post("/userfind", (req, res) => {
// 	const email = req.body.email;
// 	// Find user by email
// 	User.findOne({ email }).then(user => {
// 		// Check if user email exists
// 		if (!user) {
// 			return res.status(404).json({
// 				error: "Email not found",
// 			});
//         }
//         else{
//             res.send("Email Found");
//             return user;
//         }
// 	});
// });

module.exports = router;

