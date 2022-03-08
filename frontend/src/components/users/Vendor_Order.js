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
import { useRef } from 'react';
import emailjs from 'emailjs-com';

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Popup from './Popup';


const Vendor_Order = (props) => {


    var total=0;
    const pathname = window.location.pathname;
    const answer_array = pathname.split('/');
    const idtemp = answer_array[2];

    const [sortName, setSortName] = useState(true);
    const [users, setUsers] = useState([]);

    const Reject = (id) => {
    
        const object={
            id: users[id]._id,
            itemname: users[id].itemname,
            quantity: users[id].quantity,
            cost: users[id].cost,
            studentid: users[id].studentid,
            vendorid: users[id].vendorid,
            itemid: users[id].itemid,
            status: "rejected"

        }
      console.log("REJJJJJJJJJJJJJJJJJJJJJJJJJEEEEEEEEEEEEEEEECCCCCCCCCCCCCCTTTTTTTT");
        axios
        .post("/api/vendor/order/reject", object)
        .then((response) => {
            // setUsers(response.data);
            //    setSortedUsers(response.data);
            // setSearchText("");
            console.log(response.data);
            alert(response.data);

        })
        .catch((error) => {
            alert("pakkali");
            console.log(error);
        });
        // window.location.reload(false);
        window.location.reload(false);
    // const sendEmail = (e) => {
    //     e.preventDefault();
     
    //     console.log("Sad");
        // emailjs.sendForm('service_68wrlqf', 'service_68wrlqf', e.target, 'user_KKEFdHcJG3W6eM67Ex4nM')
    //       .then((result) => {
    //           console.log(result.text);
    //           alert(result.text);
    //       }, (error) => {
    //           console.log(error.text);
    //           alert(error.text);
    //       });
    //   };

    //   return(
    //     <form className="contact-form" onSubmit={sendEmail}>
    //         <input type="text" placeholder={users[id].status} name="status"/>
    //         <input type="submit" value="Send Email" />
    //       </form>

    //   );
     }

    const MoveToNextStage = (id) => {
      console.log("hello");
       
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
        const obb={
            _id:users[id].vendorid
        }

        
        if(users[id].status=="placed"){
            axios
             .post("/api/vendor/find",obb)
             .then((response) => {
               const cooking = response.data.cooking;
               console.log("COKKING")
               console.log(cooking);
               console.log(response.data);

               if(parseInt(cooking)< 10){
                axios
                .post("/api/vendor/order/update", changed)
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
               else
               {
                   alert("Too many orders!! wait for some time");
               }

            })
            .catch((error) => {
                console.log(error);
            });
        }
        else{
            axios
                .post("/api/vendor/order/update", changed)
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
            .post("/api/vendor/order/find", obj)
            .then((response) => {
                setUsers(response.data);
                //    setSortedUsers(response.data);
                // setSearchText("");
                console.log(response.data);

            })
            .catch((error) => {
                console.log(error);
            });
            // window.location.reload(false);
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
                                    <TableCell>Food Item Id</TableCell>
                                    <TableCell>Food Name</TableCell>
                                    <TableCell>Cost</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell >Move to Next Stage</TableCell>
                                    <TableCell >Reject</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, ind) => (
                                    <TableRow key={ind} >
                                        <TableCell>{ind}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>{user.quantity}</TableCell>
                                        <TableCell>{user.itemid}</TableCell>
                                        <TableCell>{user.itemname}</TableCell>
                                        <TableCell>{user.cost}</TableCell>
                                        <TableCell>{user.status}</TableCell>
                                        {user.status=="placed"&&
                                    <>
                                     < TableCell > <Grid item xs ={12}>
                                         <Button variant = "contained" onClick={()=>Reject(ind)}>
                                            Reject
                                         </Button>
                                         </Grid>
                                         </TableCell>
                                         </>

                                        
                                    }
                                    {user.status=="placed"&&
                                    <>
                                     < TableCell > <Grid item xs ={12}>
                                         <Button variant = "contained" onClick={()=>MoveToNextStage(ind)}>
                                            Move To Next Stage
                                         </Button>
                                         </Grid>
                                         </TableCell>
                                         </>
                                    }
                                      {user.status=="accepted"&&
                                    <>
                                     < TableCell > <Grid item xs ={12}>
                                         <Button variant = "contained" onClick={()=>MoveToNextStage(ind)}>
                                            Move To Next Stage
                                         </Button>
                                         </Grid>
                                         </TableCell>
                                         </>
                                    }
                                          {user.status=="cooking"&&
                                    <>
                                     < TableCell > <Grid item xs ={12}>
                                         <Button variant = "contained" onClick={()=>MoveToNextStage(ind)}>
                                            Move To Next Stage
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
export default Vendor_Order;