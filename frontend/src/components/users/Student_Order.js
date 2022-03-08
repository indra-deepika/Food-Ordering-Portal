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

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Popup from './Popup';



const Student_Order = (props) => {


    const pathname = window.location.pathname;
    const answer_array = pathname.split('/');
    const idtemp = answer_array[2];

    const [sortName, setSortName] = useState(true);
    const [users, setUsers] = useState([]);


  

    const Pickup=(id)=>{
         
        const changed = {
            status: users[id].status,
            cost: users[id].cost,
            itemid: users[id].itemid,
            studentid: users[id].studentid,
            vendorid: users[id].vendorid,
            itemname: users[id].itemname,
            quantity:users[id].quantity,
            id: users[id]._id
        }
     

            axios
                .post("/api/student/order/update", changed)
                .then((response) => {
                    setUsers(response.data);
                    //    setSortedUsers(response.data);
                    // setSearchText("");
                    console.log(response.data);

                })
                .catch((error) => {
                    console.log(error);
                });
         window.location.reload(false);
    }

    const sortChange = () => {
        let usersTemp = users;
        const flag = sortName;
        usersTemp.sort((a, b) => {
            if (a.date != undefined && b.date != undefined) {
                return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
            } else {
                return 1;
            }
        });
        setUsers(usersTemp);
        setSortName(!sortName);
    };
    const obj = {
        id: idtemp
    }
    console.log(obj.id);
    useEffect(() => {
        axios
            .post("/api/student/order/find", obj)
            .then((response) => {
                setUsers(response.data);
                console.log(response.data);
                // window.location.reload();

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                            <h1>Filters</h1>

                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField
                            id="standard-basic"
                            label="Search"
                            fullWidth={true}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        // onChange={customFunction}
                        />
                    </List>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell> Sr No.</TableCell>
                                    <TableCell>
                                        {" "}
                                        <Button onClick={sortChange}>
                                            {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                        </Button>
                                        Date
                                    </TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Vendor</TableCell>
                                    <TableCell>Food Name</TableCell>
                                    <TableCell>Cost</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, ind) => (
                                    <TableRow key={ind} >
                                        <TableCell>{ind}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>{user.quantity}</TableCell>
                                        <TableCell>{user.vendor}</TableCell>
                                        <TableCell>{user.itemname}</TableCell>
                                        <TableCell>{user.cost}</TableCell>
                                        <TableCell>{user.status}</TableCell>
                                    {user.status=="ready for pick up"&&
                                    <>
                                     < TableCell > <Grid item xs ={12}>
                                         <Button variant = "contained" onClick={()=>Pickup(ind)}>
                                             Picked up
                                         </Button>
                                         </Grid>
                                         </TableCell>
                                         </>
                                    }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>

        </div>
    );

    
    


};
export default Student_Order;