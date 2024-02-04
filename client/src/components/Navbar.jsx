import React from "react";
import "../static/Navbar.css";

function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location = '/';
}

  return (
    <nav className="navbar">
      <div className="box-left">
        <img
          src="https://png.pngtree.com/element_our/20190601/ourmid/pngtree-white-edit-icon-image_1338673.jpg"
          alt="Logo"
          className="logo"
        />
        <ul className="ul-left">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/create">Create</a>
          </li>
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
