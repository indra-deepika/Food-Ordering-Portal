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
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Vendor_Statistics = (props) => {
    const [users, setUsers] = useState([]);
    const [openit, setOpenit] = useState("false");
    const [orderusers, setorderUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const pathname = window.location.pathname;
    const answer_array = pathname.split('/');
    const idtemp = answer_array[2];

    const [top, setTop] = useState([]);

    var placed = 0;
    var pending = 0;
    var completed = 0;
    var rejected = 0;

        const obj = {
        id: idtemp
    }


    
  const sortChange = () => {
    console.log(users);
    let usersTemp = users;
    console.log(usersTemp);
    usersTemp.sort((a, b) =>  (b.noofbuyers - a.noofbuyers));
    setUsers(usersTemp);
    console.log("Top users display:");
    console.log(usersTemp);
    setTop(users.slice(0,5))
    setSortName(!sortName);

    if(openit === "false")
    setOpenit("1")
   
  };     

    useEffect(() => {
        axios
        .post("/api/vendor/order/find", obj)
            .then((response) => {
                setorderUsers(response.data);
   
            })
            .catch((error) => {
                console.log(error);
            });

            axios
            .post("/api/vendor/items", obj)
            .then((response) => {
                setUsers(response.data);
   
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <div className="container">
                    <Grid item xs={12} md={9} lg={9}>
                 
                            <Table size="small">
                                <TableHead>
                                    <TableRow>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderusers.map((user, ind) => (
                                        <>
                                            {(() => {
                                                if (user.status === "placed") {
                                                    placed = placed + 1;
                                                    console.log(placed);
                                                }
                                                else if (user.status === "completed") {
                                                    completed = completed + 1;
                                                    console.log(completed)
                                                }
                                                else if (user.status === "rejected") {
                                                    rejected = rejected + 1;
                                                }
                                                else{
                                                    pending =  pending+1;
                                                }
                                            }
                                            )()}
                                            </>
                                    ))}

                                </TableBody>
                            </Table>
                    
                    </Grid>
                <h2>placed-{placed}</h2>
                <h2>completed-{completed}</h2>
                <h2>pending-{pending}</h2>
            </div>
                  
       {openit === "false" && 
        <Grid>
             <Button variant="contained" onClick={sortChange}>
                 View 
             </Button>
        </Grid>
        }

            {openit === "1" && <Grid container>
        <Grid item xs={12} md={9} lg={9}>
         
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>
                    No of Buyers
                  </TableCell>
                  <TableCell>Item Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {top.map((user, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind }</TableCell>
                    <TableCell>{user.noofbuyers}</TableCell>
                    <TableCell>{user.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
    
        </Grid>
      </Grid>}
      <br/>

        </div >

    );
};

export default Vendor_Statistics;