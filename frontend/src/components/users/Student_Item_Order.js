import * as React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Popup from './Popup';
import { WindowSharp } from '@mui/icons-material';
import UsersList from './UsersList';
const Student_Item_Order = (props) => {

  const pathname = window.location.pathname;
  const answer_array = pathname.split('/');
  const idtemp = answer_array[2];

  const index = localStorage.getItem('ind');


  const [name, setName] = React.useState("Name");
  const [isNameFocused, setIsNamedFocused] = React.useState(false);
  const [age, setAge] = React.useState("Age");
  const [isAgeFocused, setIsAgeFocused] = React.useState(false);
  const [batch, setBatch] = React.useState("Batch");
  const [isBatchFocused, setIsBatchFocused] = React.useState(false);
  const [contact, setContact] = React.useState("Contact");
  const [email, setEmail] = React.useState("Email");
  const [isContactFocused, setIsContactFocused] = React.useState(false);
  const [password, setPassword] = React.useState("Password");
  const [wallet, setWallet] = React.useState(0);
  const [count, setCount] = useState(0);
  // const [noofbuyers, setNoofbuyers] = useState(0);


  // const onChangeNoofbuyers = (event) => {
  //   setNoofbuyers(event.target.value);
  // };
  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeAge = (event) => {
    setAge(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };
  const onChangeContact = (event) => {
    setContact(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangeWallet = (event) => {
    setWallet(event.target.value);
  };


  const [users, setUsers] = useState([]);

  const [quantity, setQuantity] = useState('');
  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const [cost, setCost] = useState('');
  const onChangeCost = (event) => {
    setCost(event.target.value);
  };

  //    const onChangeWallet = (event) => {
  //     setWallet(event.target.value);
  //   };
  //   const [wallet, setWallet] = React.useState(0);


  const obj = {
    _id: idtemp
  }


  useEffect(() => {
    axios
      .post("/api/student/find", obj)
      .then((response) => {
        console.log(response.data);
        setName(response.data.name);
        setAge(response.data.age);
        setBatch(response.data.batch);
        setContact(response.data.contact);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setWallet(response.data.wallet);
      })
      .catch(function (error) {
        // alert("Invalid Credentials");
        console.log(error);

      });
  }, []);
  const studentid = localStorage.getItem('studentid')
  const itemid = localStorage.getItem('itemid')
  const vendorid = localStorage.getItem('vendorid')
  const itemname = localStorage.getItem('name')
  const noofbuyers = localStorage.getItem('noofbuyers')
  //    const wallet = localStorage.getItem('wallet')



  const resetInputs = () => {
    setQuantity("")
  };




  const Submit = () => {

    console.log("Placing Order");
    console.log(wallet);
    console.log(price);


    if (quantity * price > wallet) {
      alert("Not Sufficient Money");

      resetInputs();
    }

    else {
      console.log("COKKING");
      const obb = {
        _id: vendorid
      }
      axios
        .post("/api/vendor/find", obb)
        .then((response) => {
          const cooking = response.data.cooking;
          console.log("COKKING")
          console.log(cooking);
          console.log(response.data);

        
            console.log("COKKING2")
            const obj = {
              quantity: quantity,
              cost: quantity * price,
              studentid: studentid,
              itemid: itemid,
              vendorid: vendorid,
              itemname: itemname,
              status: "placed"
            }

            axios
              .post("/api/student/order", obj)
              .then((response) => {
                console.log(response.data);
                alert("Placed");

              })
              .catch(function (error) {
                alert("Error");
                console.log(error);

              });


            const obj2 = {
              itemid: itemid,
              noofbuyers: parseInt(parseInt(noofbuyers) + parseInt(1))
            }
           console.log("nobuyyyyyyyyyyyyyyyyy");
           console.log(obj2.noofbuyers)
            axios
              .post("/api/vendor/item/updatebuy", obj2)
              .then((response) => {
                alert(response.data)
              });

            resetInputs();

            // console.log(wallet);
            // console.log("ENDUKU RAAA")
            // console.log(price * quantity);

            const newVendor = {
              name: name,
              email: email,
              contact: contact,
              age: age,
              batch: batch,
              password: password,
              wallet: wallet - price * quantity,
              _id: idtemp
            };
            axios
              .post("/api/student/edit", newVendor)
              .then((response) => {
                alert(response.data)
              });
        })
        .catch((error) => {
          console.log(error);
        });

    }


  };

  useEffect(() => {
    axios
      .get("/api/student/items")
      .then((response) => {
        setUsers(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const price = localStorage.getItem('price');

  console.log(index);
  console.log(price);


  return (

    <Grid container align={"center"} spacing={2} >

      <Grid item xs={12}>
        <Box sx={{ minWidth: 120 }}>
          <Grid item xs={12}>
            <TextField
              label="Quantity"
              variant="outlined"
              value={quantity}
              onChange={onChangeQuantity}
            /></Grid> </Box>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ minWidth: 120 }}>
          <Grid item xs={12}>
            <TextField
              label="Cost"
              variant="outlined"
              value={quantity * price}
              onChange={onChangeCost}
            />
          </Grid>

        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={Submit} >
          Place Order
        </Button>
      </Grid>
    </Grid>
  );

};
export default Student_Item_Order;