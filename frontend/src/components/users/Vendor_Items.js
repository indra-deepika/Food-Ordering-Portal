import Navbar_Vendors from "../templates/Navbar_Vendors";
import * as React from 'react';
// import ReactDOM from "react-dom";
// import Typography from "@mui/material/Typography";
// import { ViewAgenda } from "@mui/icons-material";
import Box from '@mui/material/Box';
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
import {
    useParams,
} from "react-router-dom";



const Vendor_Items = (props) => {



    const pathname = window.location.pathname;
    const answer_array = pathname.split('/');
    const idtemp = answer_array[2];


    const [itemname, setItemName] = React.useState('');
    const [itemnotoedit, setItemNoToEdit] = React.useState('');
    const [itemnotodelete, setItemNoToDelete] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [veg_non, setVeg_Non] = React.useState('');
    const [vendor, setVendor] = React.useState('');
    const [shopname, setShopName] = React.useState('');


    const onChangeName = (event) => {
        setSortName(event.target.value);
    };
    const onChangeItemName = (event) => {
        setItemName(event.target.value);
    };
    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };
    const onChangeVeg_Non = (event) => {
        setVeg_Non(event.target.value);
    };
    const onChangeVendor = (event) => {
        setVendor(event.target.value);
    };
    const onChangeShopName = (event) => {
        setShopName(event.target.value);
    };
    const onChangeItemNoToEdit = (event) => {
        setItemNoToEdit(event.target.value);
    };
    const onChangeItemNoToDelete = (event) => {
        setItemNoToDelete(event.target.value);
    };



    const [users, setUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");



    const newUser = {
        id: idtemp
    };

    useEffect(() => {
        axios
            .post("/api/vendor/items", newUser)
            .then((response) => {
                setUsers(response.data);
                setSortedUsers(response.data);
                setSearchText("");
            })
            .catch((error) => {
                console.log(error);
            });
            // window.location.reload(false);
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

    const [password, setPassword] = React.useState('');


 
  
     const DeleteItem = (id) => {

        // alert("INNNNN");
        console.log(users[id]);
        const obj2 =
        {
            _id: users[id]._id
        };

        axios
        .post("/api/vendor/item/delitem", obj2)
        .then((response) => {
            console.log(response.data);
        })
        .catch(function (error) {
            alert("Error");
            console.log(error);

        });
    }

    const AddItem = (event) => {

        event.preventDefault();

        const newUse = {
            name: itemname,
            price: price,
            rating: 0,
            veg_non: veg_non,
            vendor: vendor,
            shopname: shopname,
            vendorid: idtemp,
            noofbuyers:0

        };



        const resetInputs = () => {
            setItemName("");
            setPrice("");
            setVeg_Non("");

        };

        const obj =
        {
            _id: idtemp
        };

        axios
            .post("/api/vendor/find", obj)
            .then((response) => {
                console.log(response.data);
                //alert("Created " + response.data);
                setVendor(response.data.name);
                setShopName(response.data.shopname);
            })
            .catch(function (error) {
                alert("Error");
                console.log(error);

            });

        axios
            .post("/api/vendor/item/additem", newUse)
            .then((response) => {
                console.log(response.data);
                alert("Created " + response.data);
            })
            .catch(function (error) {
                alert("Error");
                console.log(error);

            });
 
            // window.location.reload(false);
        resetInputs();
    };
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);


    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    const togglePopup2 = () => {
        setIsOpen2(!isOpen2);
    }
    const togglePopup3 = () => {
        setIsOpen3(!isOpen3);
    }
    const togglePopup4 = () => {
        setIsOpen4(!isOpen3);
    }


    const EditItem =(id) =>{

    
        localStorage.setItem('ind',id);
        localStorage.setItem('price',users[id].price);
        localStorage.setItem('studentid',idtemp);
        localStorage.setItem('itemid',users[id]._id);
        localStorage.setItem('vendorid',users[id].vendorid);
        localStorage.setItem('name',users[id].name);
        window.location.href=`/vendor/${idtemp}/items/edit`
    };


    return (<div>
        <Grid item xs={12}></Grid>
        <Button
            type="button"
            value="Click to Open Popup"
            onClick={togglePopup}
        >Add Item</Button>

        {isOpen && <Popup
            content={<>

                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={itemname}
                        onChange={onChangeItemName}

                    /> </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Price"
                        variant="outlined"
                        value={price}
                        onChange={onChangePrice} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Veg or Non (0 for veg 1 for non)"
                        variant="outlined"
                        value={veg_non}
                        onChange={onChangeVeg_Non} />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" onClick={AddItem}>
                        Submit
                    </Button>
                </Grid>


            </>}
            handleClose={togglePopup}
        />}


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
            <Grid item xs={12} md={3} lg={3}>
                <List component="nav" aria-label="mailbox folders">
                    <ListItem>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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
                            </Grid>
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
                                <TableCell>Edit</TableCell>
                                <TableCell >Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, ind) => (
                                <TableRow key={ind} >
                                    <TableCell>{ind}</TableCell>
                                    <TableCell>{user.date}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.price}</TableCell>
                                    <TableCell><Button onClick={()=>EditItem(ind)}>Edit</Button></TableCell>
                                    <TableCell><Button onClick={()=>DeleteItem(ind)}>Delete</Button></TableCell>
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
export default Vendor_Items;