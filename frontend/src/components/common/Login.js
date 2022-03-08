
import { useState } from "react";
import axios from "axios";
import * as React from 'react';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Student_Profile from "../users/Student_Profile";
import { WindowSharp } from "@mui/icons-material";



const Login = (props) => {

    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const [password, setPassword] = React.useState('');
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const resetInputs = () => {
        setEmail("");
        setPassword("");
    };

    const onSubmit1 = (event) => {

        event.preventDefault();

        const newUser = {
            email: email,
            password: password,
        };

        axios
            .post("/api/loginREG", newUser)
            .then((response) => {
                console.log(response.data.element._id);

                if(response.data.role=="User")
                {
                  window.location.href=`/student/${response.data.element._id}/myprofile`;
                }

                if(response.data.role=="Vendor")
                {
                 window.location.href=`/vendor/${response.data.element._id}/myprofile`;
                }
            })
            .catch(function (error) {
                alert("Invalid Credentials");
                console.log(error);

              });

        resetInputs();
      
    };
    return (
        <Grid container align={"center"} spacing={2} >

            <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={onChangeEmail}
                        /></Grid> </Box>
            </Grid>

            <Grid item xs={12}>
                <Box sx={{ minWidth: 120 }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            value={password}
                            onChange={onChangePassword}
                        />
                    </Grid>

                </Box>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onSubmit1}>
                    Login
                </Button>
            </Grid>
        </Grid>
    );

};


export default Login;