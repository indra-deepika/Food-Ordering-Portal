
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import * as React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
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
import Box from "@mui/material/Box";

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Popup from './Popup';
import { WindowSharp } from '@mui/icons-material';

const Student_Wallet = () => {


    const pathname = window.location.pathname;
    const answer_array = pathname.split('/');
    const idtemp = answer_array[2];


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
    const [quantity, setQuantity] = React.useState(0);
    const [count, setCount] = useState(0);
 
    const onChangeQuantity = (event) => {
        setQuantity(event.target.value);
      };
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
   const obj =
   {
       _id: idtemp
   };
 

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
    },[count]);
       
//    const [quantity, setQuantity] = useState('');
//    const onChangeQuantity = (event) => {
//      setQuantity(event.target.value);
//    };

    const [users, setUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");

    const obt={
    name: name,
    email: email,
    contact: contact,
    age: age,
    batch: batch,
    password: password,
    wallet:parseInt(quantity)+parseInt(wallet),
    _id:idtemp

    }

    const Submit =()=>{

        console.log("in submit");
        console.log(obt);

          axios
          .post("/api/student/wallet/add",obt)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });

          setQuantity("");
  
    }

    // useEffect(() => {
    //     axios
    //       .post("/api/student/fav/find",obt)
    //       .then((response) => {
    //         setUsers(response.data);
    //         setSortedUsers(response.data);
    //         setSearchText("");
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }, []);
    

  
      return (
        <Grid container align={"center"} spacing={2} >

            <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Amount to add"
                            variant="outlined"
                            value={quantity}
                            onChange={onChangeQuantity}
                        /></Grid> </Box>
            </Grid>

            <Grid item xs={12}>
                <Button variant="contained" onClick={Submit} >
                    Add amount
                </Button>
            </Grid>
        </Grid>
      );
  

};

export default Student_Wallet;