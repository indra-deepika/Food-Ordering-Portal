import Navbar_Vendors from "../templates/Navbar_Vendors";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import * as React from 'react';
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { ShoppingBag, ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import {
    useParams,
} from "react-router-dom";
import Popup from './Popup';
// import { EditText, EditTextarea } from 'react-edit-text';


const Vendor_Profile = (props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [count, setCount] = useState(0);
  const [shopname, setShopName] = useState("");
  const [opentime, setOpenTime] = useState("");
  const [closetime, setCloseTime] = useState("");
  const onChangeUsername = (event) => {
    setName(event.target.value);
  };
  const onChangeShopName = (event) => {
    setShopName(event.target.value);
  };


  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeOpenTime= (event) => {
    setOpenTime(event.target.value);
  };

  const onChangeCloseTime = (event) => {
    setCloseTime(event.target.value);
  };


  const { id } = useParams();

    console.log(id);
    console.log("ID OF THE VENDOR");

    const obj =
    {
        _id: id
    };

    console.log(obj._id);


  useEffect(() => {
    axios
      .post("/api/vendor/find",obj)
      .then((response) => {
        setName(response.data.name)
        setEmail(response.data.email)
        setContact(response.data.contact)
        setShopName(response.data.shopname)
        setOpenTime(response.data.opentime)
        setCloseTime(response.data.closetime)
        setPassword(response.data.password)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [count]);


  const onSubmit = (event) => {
    event.preventDefault();

    const newVendor = {
      name: name,
      email: email,
      contact: contact,
      shopname: shopname,
      opentime: opentime,
      closetime: closetime,
      password: password,
      _id:id
    };
        axios
          .post("/api/vendor/edit", newVendor)
          .then((response) => {
            alert(response.data)
          });

          setCount((c) => c + 1)
  };

  return (
    <div container align={"center"}>
     <h2>Name: {name}</h2>
     <h2>Email: {email}</h2>
     <h2>Shop Name: {shopname}</h2>
     <h2>Contact Number: {contact}</h2>
     <h2>Opening Time: {opentime}</h2> 
     <h2>Closing Time: {closetime}</h2>
     <h2>Password: {password}</h2>

     <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={onChangeUsername}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contact Number"
            variant="outlined"
            value={contact}
            onChange={onChangeContact}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Openning time"
            variant="outlined"
            value={opentime}
            onChange={onChangeOpenTime}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Clossing Time"
            variant="outlined"
            value={closetime}
            onChange={onChangeCloseTime}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={onChangePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            Edit
          </Button>
        </Grid>
        </Grid>
    </div>
  );

};
export default Vendor_Profile;