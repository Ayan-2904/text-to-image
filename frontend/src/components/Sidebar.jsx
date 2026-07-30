import {
  NavLink,
} from "react-router-dom";


import {
  FaHome,
  FaHistory,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";


import { useAuth } from "../context/AuthContext";



function Sidebar() {


  const { logout } = useAuth();




  return (


    <aside className="sidebar">






      <div className="logo">


        <h2>

          AI Studio

        </h2>


        <span>

          Text To Image

        </span>


      </div>









      <nav className="menu">






        <NavLink

          to="/dashboard"

          className="menu-item"

        >

          <FaHome />

          Dashboard


        </NavLink>









        <NavLink

          to="/history"

          className="menu-item"

        >

          <FaHistory />

          History


        </NavLink>









        <NavLink

          to="/settings"

          className="menu-item"

        >

          <FaCog />

          Settings


        </NavLink>







      </nav>









      <div className="sidebar-footer">



        <button

          className="logout-btn"

          onClick={logout}

        >


          <FaSignOutAlt />


          Logout



        </button>



      </div>





    </aside>


  );

}


export default Sidebar;