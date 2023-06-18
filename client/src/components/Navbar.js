import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const Navbar = () => {
  const user = localStorage.getItem("user");
  const { message } = useSelector((state) => state.message);

  useEffect(() => {}, [user]);

  const handleClick = () => {
    localStorage.clear("user");
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark px-5">
        <Link to={"/"} className="navbar-brand">
          To-do List
        </Link>
        <div className="navbar-nav d-flex justify-content-between">
          <li className="nav-item">
            {!user ? (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            ) : (
              <Link to={"/"} className="nav-link" onClick={handleClick}>
                Logout
              </Link>
            )}
          </li>
        </div>
      </nav>
      {message ? (
        <div className="text-center py-2 border">{message}</div>
      ) : null}
    </div>
  );
};

export default Navbar;
