var express = require("express");
var router = express.Router();

// Load User model

const Item = require("../models/Items");
const Orders = require("../models/Orders");
const User= require("../models/Users");
const Favourite= require("../models/Favourites");

router.post("/edit",function(req,res){
    const id=req.body._id;
    console.log("Here editing");
    // console.log(req.body._id);
    // console.log(req.body.name);
    // console.log(req.body.contact);
    // console.log(req.body.age); 
   
 
    User.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        contact:req.body.contact,
        email:req.body.email,
        age:req.body.age,
        batch:req.body.batch,
        password:req.body.password,
        wallet:req.body.wallet  //add recently

    },function(err,docs){
        if(err)res.send(err);
        else{
            res.send("Updated");
        }

    });
})


router.post("/find", function(req, res) {
  
    const id = req.body._id;

    // GET THE ID OF THE VENDOR
    User.findOne({_id:id}).then(user=>{
        if (!user) {

            console.log(":((  couldnot find user");
         }
         else {
            res.send(user);
            return user;
  
         }
    })
});

// GETTING ALL THE ITEMS OF THE VENDOR


router.get("/items", function (req, res) {
    console.log("WE ARE HERE LOL");
   
    Item.find().then(item => {
        res.send(item);
    })
    .catch(err => {
        res.status(400).send(err);
    });

});


// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a item to a vendor list
router.post("/items/additem", (req, res) => {

    const id = req.body.vendorid;
    const newUser = new Item({
        name: req.body.name,
        price:req.body.price,
        rating: req.body.rating,
        veg_non:req.body.veg_non,
        vendor: req.body.vendor,
        shopname:req.body.shopname,
        vendorid:req.body.vendorid
  
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



router.post("/order", (req, res) => {

  
    const newUser = new Orders({
       quantity:req.body.quantity,
       cost:req.body.cost,
       studentid:req.body.studentid,
       itemid:req.body.itemid,
       vendorid:req.body.vendorid,
       itemname:req.body.itemname,
       status:req.body.status
    });

    console.log("KYA HUA");
    console.log(newUser);

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


router.post("/order/find", (req, res) => {

    const id = req.body.id;
    console.log("order find");

    // Items of the vendor
 
    Orders.find({ studentid: id }).then(item => {
        console.log(item);
        res.send(item);

    })

});

router.post("/order/update", function (req, res) {
    const id = req.body.id;
    console.log("order update");
    console.log(id);
    console.log(req.body.status);
    if (req.body.status == "ready for pick up") {
        // alert("Change to Accepted");

         console.log("here");
        Orders.findByIdAndUpdate({ _id: id }, {
            itemname: req.body.itemname,
            quantity: req.body.quantity,
            cost: req.body.cost,
            studentid: req.body.studentid,
            vendorid: req.body.vendorid,
            itemid: req.body.itemid,
            status:"completed"

        }, function (err, docs) {
            if (err) res.send(err);
            else {
                res.send("Updated");
                return ;
            }

        });
    }
   

})
router.post("/fav/add", function (req, res){

    console.log("fav add");
    const newUser = new Favourite({
        studentid:req.body.studentid,
        itemname:req.body.itemname
     });

    console.log(req.body.itemname)
    console.log(newUser.itemname);

     newUser.save()
     .then(user => {
         res.status(200).json(user);
     })
     .catch(err => {
         res.status(400).send(err);
     });
})


router.post("/fav/find", (req, res) => {

    const studentid = req.body.studentid;
    console.log("fav find");

    // Items of the vendor
 
    Favourite.find({ studentid: studentid }).then(item => {
        console.log(item);
        res.send(item);

    })

});

router.post("/wallet/add", (req, res) => {

    const _id = req.body._id;
    console.log("walllet add");
 
    User.findByIdAndUpdate({_id:_id},{
        name:req.body.name,
        contact:req.body.contact,
        email:req.body.email,
        age:req.body.age,
        batch:req.body.batch,
        password:req.body.password,
        wallet: req.body.wallet   //add recently

    },function(err,docs){
        if(err)res.send(err);
        else{
            res.send("Updated");
        }

    });


});



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

            