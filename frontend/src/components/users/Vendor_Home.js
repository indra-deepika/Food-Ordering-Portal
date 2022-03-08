import Navbar_Vendors from "../templates/Navbar_Vendors";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

const Student = () => {

  
        return (
          <div>
            <div className="container">
              <Outlet />
            </div>
          </div>
        );
    

};

export default Student;