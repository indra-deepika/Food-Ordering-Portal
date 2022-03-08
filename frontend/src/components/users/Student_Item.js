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
import { WindowSharp } from '@mui/icons-material';
const Student_Item = (props) => {


    const pathname = window.location.pathname;
    const answer_array = pathname.split('/');
    const idtemp = answer_array[2];

    const [quantity, setQuantity] = useState('');
    const onChangeQuantity = (event) => {
      setQuantity(event.target.value);
    };

    const [users, setUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
  
    useEffect(() => {
      axios
        .get("/api/student/items")
        .then((response) => {
          setUsers(response.data);
          setSortedUsers(response.data);
          setSearchText("");
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
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
  
    const customFunction = (event) => {
      console.log(event.target.value);
      setSearchText(event.target.value);
    };

    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const Addtofav=(id)=>{
     const ob ={
       studentid:idtemp,
       itemname:users[id].name
     }

     console.log(ob);
     axios
     .post("/api/student/fav/add", ob)
     .then((response) => {
       alert(response.data)
     });

    };

   
    const localstorages=(id) => {
        localStorage.setItem('ind',id);
        localStorage.setItem('price',users[id].price);
        localStorage.setItem('studentid',idtemp);
        localStorage.setItem('itemid',users[id]._id);
        localStorage.setItem('vendorid',users[id].vendorid);
        localStorage.setItem('name',users[id].name);
        localStorage.setItem('noofbuyers',users[id].noofbuyers);
        window.location.href=`/student/${idtemp}/items/order`
    };
  
    return (
      <div>
         <Grid item xs={12} md={3} lg={3}>
                <List component="nav" aria-label="mailbox folders">
                    <ListItem>
                        <Grid container spacing={2}>
                            {/* <Grid item xs={12}>
                                Salary
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="standard-basic"
                                    label="Enter Min"
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="standard-basic"
                                    label="Enter Max"
                                    fullWidth={true}
                                />
                            </Grid> */}
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem divider>
                        <Autocomplete
                            id="combo-box-demo"
                            options={users}
                            getOptionLabel={(option) => option.name}
                            fullWidth
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Names"
                                    variant="outlined"
                                />
                            )}
                        />
                    </ListItem>
                </List>
            </Grid>
        <Grid container>
          <Grid item xs={12} md={3} lg={3}>
            <List component="nav" aria-label="mailbox folders">
              <ListItem text>
                <h1>Filters</h1>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            {/* <List component="nav" aria-label="mailbox folders">
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
            </List> */}
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
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Shop Name</TableCell>
                    <TableCell>Vendor</TableCell>
                    <TableCell>Order</TableCell>
                    <TableCell>Add to Favourites</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, ind) => (
                    <TableRow key={ind}>
                      <TableCell>{ind}</TableCell>
                      <TableCell>{user.date}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.price}</TableCell>
                      <TableCell>{user.shopname}</TableCell>
                      <TableCell>{user.vendor}</TableCell>
                      <TableCell><Button type="button" onClick={()=>localstorages(ind)}>Order</Button></TableCell>
                      <TableCell><Button type="button" onClick={()=>Addtofav(ind)}>Add to favourites</Button>
                      </TableCell>
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
export default Student_Item;