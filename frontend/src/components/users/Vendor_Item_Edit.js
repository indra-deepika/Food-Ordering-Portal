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
const Vendor_Item_Edit = (props) => {

    // const [name, setName] = useState("");
    // const [price, setPrice] = useState("");
    // const onChangeName = (event) => {
    //   setName(event.target.value);
    // };
    // const onChangePrice = (event) => {
    //   setPrice(event.target.value);
    // };
  
    // const pathname = window.location.pathname;
    // const answer_array = pathname.split('/');
    // const idtemp = answer_array[2];
  
    //   const obj =
    //   {
    //       _id: idtemp
    //   };
  
    //   console.log(obj._id);
  
  
    // useEffect(() => {
    //   axios
    //     .post("/api/vendor/find",obj)
    //     .then((response) => {
    //       setName(response.data.name)
    //       setEmail(response.data.email)
    //       setContact(response.data.contact)
    //       setShopName(response.data.shopname)
    //       setOpenTime(response.data.opentime)
    //       setCloseTime(response.data.closetime)
    //       setPassword(response.data.password)
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }, [count]);
  
  
    // const onSubmit = (event) => {
    //   event.preventDefault();
  
    //   const newVendor = {
    //     name: name,
    //     email: email,
    //     contact: contact,
    //     shopname: shopname,
    //     opentime: opentime,
    //     closetime: closetime,
    //     password: password,
    //     _id:id
    //   };
    //       axios
    //         .post("/api/vendor/edit", newVendor)
    //         .then((response) => {
    //           alert(response.data)
    //         });
  
    //         setCount((c) => c + 1)
    // };
  
    // return (
    //   <div container align={"center"}>
    //    <h2>Name: {name}</h2>
    //    <h2>Email: {email}</h2>
    //    <h2>Shop Name: {shopname}</h2>
    //    <h2>Contact Number: {contact}</h2>
    //    <h2>Opening Time: {opentime}</h2> 
    //    <h2>Closing Time: {closetime}</h2>
    //    <h2>Password: {password}</h2>
  
    //    <Grid container align={"center"} spacing={2}>
    //       <Grid item xs={12}>
    //         <TextField
    //           label="Name"
    //           variant="outlined"
    //           value={name}
    //           onChange={onChangeUsername}
    //         />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <TextField
    //           label="Contact Number"
    //           variant="outlined"
    //           value={contact}
    //           onChange={onChangeContact}
    //         />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <TextField
    //           label="Openning time"
    //           variant="outlined"
    //           value={opentime}
    //           onChange={onChangeOpenTime}
    //         />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <TextField
    //           label="Clossing Time"
    //           variant="outlined"
    //           value={closetime}
    //           onChange={onChangeCloseTime}
    //         />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <TextField
    //           label="Password"
    //           variant="outlined"
    //           value={password}
    //           onChange={onChangePassword}
    //         />
    //       </Grid>
    //       <Grid item xs={12}>
    //         <Button variant="contained" onClick={onSubmit}>
    //           Edit
    //         </Button>
    //       </Grid>
    //       </Grid>
    //   </div>
    // );
  
   

};
export default Vendor_Item_Edit;