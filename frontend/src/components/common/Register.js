import { useState } from "react";
import axios from "axios";
import * as React from 'react';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

const Register = (props) => {

  function BasicSelect() {

    const [temp, setTemp] = React.useState('');
    const [age, setAge] = React.useState('');
    const [shopname, setShopName] = React.useState('');
    const [closetime, setCloseTime] = React.useState('');
    const [opentime, setOpenTime] = React.useState('');
    const [batch, setBatch] = React.useState('');
    const [password, setPassword] = React.useState('');


    const onChangeAge = (event) => {
      setAge(event.target.value);
    };

    const onChangePassword = (event) => {
      setPassword(event.target.value);
    };
    const onChangeBatch = (event) => {
      setBatch(event.target.value);
    };
    const onChangeShopName = (event) => {
      setShopName(event.target.value);
    };
    const onChangeOpenTime = (event) => {
      setOpenTime(event.target.value);
    };
    const onChangeCloseTime = (event) => {
      setCloseTime(event.target.value);
    };

    const onChangeTemp = (event) => {
      setTemp(event.target.value);
    };

    const navigate = useNavigate();



    const handleChange = (event) => {

      setTemp(event.target.value);

    };

    const onSubmit1 = (event) => {


      console.log(temp);

      event.preventDefault();



      const newUser = {
        name: name,
        email: email,
        contact: contact,
        age: age,
        batch: batch,
        password: password,
        date: Date.now(),
      };

      axios
        .post("/api/register/student", newUser)
        .then((response) => {
          alert("Created\t" + response.data.name);
          console.log(response.data);
        });

      resetInputs();

    };
    const onSubmit2 = (event) => {

      console.log(temp);

      event.preventDefault();



      const newUser = {
        name: name,
        email: email,
        contact: contact,
        shopname: shopname,
        closetime: closetime,
        opentime: opentime,
        password: password,
        date: Date.now(),
      };

      axios
        .post("/api/register/vendor", newUser)
        .then((response) => {
          alert("Created\t" + response.data.name);
          console.log(response.data);
        });

      resetInputs();

    };

    return (
      <Grid container align={"center"} spacing={2} >

        <Grid item xs={12}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type   </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={temp}
                label="Type"
                onChange={handleChange}
              >
                <MenuItem value={10}>Vendor</MenuItem>
                <MenuItem value={20}>Student</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        {temp == 10 && <Grid item xs={12}>
          <Grid item xs={12}>
            <TextField
              label="Shop Name"
              variant="outlined"
              value={shopname}
              onChange={onChangeShopName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Close Time"
              variant="outlined"
              value={closetime}
              onChange={onChangeCloseTime} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Open Time"
              variant="outlined"
              value={opentime}
              onChange={onChangeOpenTime} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              onChange={onChangePassword} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit2}>
              Register
            </Button>
          </Grid>

        </Grid>
        }
        {temp == 20 && <Grid item xs={12}>
          <Grid item xs={12}>
            <TextField
              label="Age"
              variant="outlined"
              value={age}
              onChange={onChangeAge}

            /> </Grid>
          <Grid item xs={12}>
            <TextField
              label="Batch"
              variant="outlined"
              value={batch}
              onChange={onChangeBatch} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              value={password}
              onChange={onChangePassword} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit1}>
              Register
            </Button>
          </Grid>

        </Grid>
        }
      </Grid>
    );
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [shopname, setShopName] = useState("");
  const [opentime, setOpenTime] = useState("");
  const [closetime, setCloseTime] = useState("");
  const [password, setPassword] = useState("");
  const [temp, setTemp] = useState("");
  const [date, setDate] = useState(null);

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };


  const resetInputs = () => {
    setName("");
    setEmail("");
    setContact("");
    setAge("");
    setBatch("");
    setShopName("");
    setOpenTime("");
    setCloseTime("");
    setPassword("");
    setDate(null);
  };

  const navigate = useNavigate();


  return (
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
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeEmail}
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
      <Grid item xs={12}  > <BasicSelect></BasicSelect>  </Grid>


    </Grid>

  );
};

export default Register;
