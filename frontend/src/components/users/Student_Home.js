import Navbar_Students from "../templates/Navbar_Students";
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