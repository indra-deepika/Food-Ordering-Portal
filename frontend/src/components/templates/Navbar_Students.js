import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


const Navbar = () => {

   const navigate = useNavigate();
   

   const pathname = window.location.pathname;
   console.log(pathname);

   const answer_array = pathname.split('/');
   console.log(answer_array);
   const idtemp = answer_array[2];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() =>  window.location.href=`/student/${idtemp}/myprofile` }>
            My Profile
          </Button>
          <Button color="inherit" onClick={() => window.location.href=`/student/${idtemp}/items` }>
            Items
          </Button>
          <Button color="inherit" onClick={() => window.location.href=`/student/${idtemp}/myorders` }>
            My Orders
          </Button>
          <Button color="inherit" onClick={() => window.location.href=`/student/${idtemp}/favourites` }>
            Favourites
          </Button>
          <Button color="inherit" onClick={() => window.location.href=`/student/${idtemp}/wallet` }>
            Add to wallet
          </Button>
          {/* BALANCE:{wallet} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
  