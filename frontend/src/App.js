import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Login from "./components/common/Login";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Navbar_Students from "./components/templates/Navbar_Students";
import Navbar_Vendors from "./components/templates/Navbar_Vendors";
import Student from "./components/users/Student_Home";
import Student_Profile from "./components/users/Student_Profile";
import Vendor from "./components/users/Vendor_Home";
import Vendor_Profile from "./components/users/Vendor_Profile";
import Vendor_Statistics from "./components/users/Vendor_Statistics";
import Vendor_Items from "./components/users/Vendor_Items";
// import Vendor_Items_Edit from "./components/users/Vendor_Item_Edit";
import Vendor_Order from "./components/users/Vendor_Order";
import Student_Order from "./components/users/Student_Order";
import Student_Wallet from "./components/users/Student_Wallet";
import Student_Item from "./components/users/Student_Item.js";
import Student_Favourites from "./components/users/Student_Favourites.js";
import Student_Item_Order from "./components/users/Student_Item_Order.js";



const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
const UserLayout = () => {
  return (
    <div>
      <Navbar_Students />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
const VendorLayout = () => {
  return (
    <div>
      <Navbar_Vendors />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="profile" element={<Profile />} /> */}
          <Route path="login" element={<Login />} /> 
          </Route>
          <Route path="/" element={<UserLayout />}> 
          <Route path="student" element={<Student />} /> 
          <Route path="student/:id/myprofile" element={<Student_Profile />} /> 
          <Route path="student/:id/myorders" element={<Student_Order />} />
          <Route path="student/:id/items" element={<Student_Item />} />
          <Route path="student/:id/items/order" element={<Student_Item_Order />} />
          <Route path="student/:id/favourites" element={<Student_Favourites />} />
          <Route path="student/:id/wallet" element={<Student_Wallet />} />
          </Route>
          <Route path="/" element={<VendorLayout />}> 
          <Route path="vendor" element={<Vendor />} /> 
          <Route path="vendor/:id/myprofile" element={<Vendor_Profile />} /> 
          <Route path="vendor/:id/items" element={<Vendor_Items />} /> 
          {/* <Route path="vendor/:id/items/edit" element={<Vendor_Items_Edit />} />  */}
          <Route path="vendor/:id/orders" element={<Vendor_Order />} /> 
          <Route path="vendor/:id/stats" element={<Vendor_Statistics />} />
          </Route>

      </Routes>

    </BrowserRouter>
  );    
}

export default App;
