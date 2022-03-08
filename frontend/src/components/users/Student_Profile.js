import Navbar_Students from "../templates/Navbar_Students";
import * as React from 'react';
import Button from "@mui/material/Button";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  useParams,
} from "react-router-dom";



const Student_Profile = (props) => {



  console.log("HATE THIS");
  console.log(props);
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
   const [wallet, setWallet] = React.useState("Wallet");
   const [count, setCount] = useState(0);

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

  const { id } = useParams();

  console.log(id);
  console.log("ID OF THE STUDENT");

  const obj =
  {
      _id: id
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

const onSubmit = (event) => {
  event.preventDefault();

  const newVendor = {
    name: name,
    email: email,
    contact: contact,
    age: age,
    batch: batch,
    password: password,
    wallet:wallet,
    _id:id
  };
      axios
        .post("/api/student/edit", newVendor)
        .then((response) => {
          alert(response.data)
        });

        setCount((c) => c + 1)
};

 
  

  return (
    <div container align={"center"}>
     <h2>Name: {name}</h2>
     <h2>Age: {age}</h2>
     <h2>Batch: {batch}</h2>
     <h2>Contact: {contact}</h2>
     <h2>Email: {email}</h2>
     <h2>Password: {password}</h2>
     <h2>Wallet: {wallet}</h2>
    
    
     <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={onChangeName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Age"
            variant="outlined"
            value={age}
            onChange={onChangeAge}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Batch"
            variant="outlined"
            value={batch}
            onChange={onChangeBatch}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contact"
            variant="outlined"
            value={contact}
            onChange={onChangeContact}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
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
export default Student_Profile;