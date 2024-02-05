import React from "react";
import "../static/Navbar.css";

function Navbar(props) {
  const { isStaff } = props; 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location = '/';
}

  return (
    <nav className="navbar">
      <div className="box-left">
        <a href="/home">
        <img
          src="https://png.pngtree.com/element_our/20190601/ourmid/pngtree-white-edit-icon-image_1338673.jpg"
          alt="Logo"
          className="logo"
        />
        </a>
        <ul className="ul-left">
          <li>
            <a href="/home">Home</a>
          </li>
          { isStaff === 1 ? (
          <li>
            <a href="/create">Create</a>
          </li> ) : (
            <li>
            <a href="/tasks">Tasks</a>
          </li>
          )
          }
        </ul>
      </div>
      <ul className="ul-right">
        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
