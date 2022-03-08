var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");
const Vendor = require("../models/Vendors");

router.post("/", (req, res) => {
    // console.log("unnana");
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email

    User.findOne({ email }).then(user => {
        // Check if user email exists
        if (!user) {
          
            Vendor.findOne({ email }).then(user => {
                if (!user) {
                   
                    return res.status(404).json({
                        error: "Email not found",
                    });
                }
                else {
                    Vendor.findOne({ email,password }).then(user => {
                    
                        if(!user)
                        {
                         
                            return res.status(404).json({
                                error: "Wrong Password",
                            });
                        }
                        else
                        {
                            const u= {role:"Vendor", element:user}
                            res.send(u);
                            console.log({user});
                            return user;
                        }
                    });
                    
                }

            });

        }
        else {
            User.findOne({ email ,password}).then(user => {
                if(!user)
                        {
                         
                            return res.status(404).json({
                                error: "Wrong Password",
                            });
                        }
                        else
                        {
                            const u= {role:"User", element:user}
                            res.send(u);
                            return user;
                        }
            });
           
        }
    });
   
});

module.exports = router;
