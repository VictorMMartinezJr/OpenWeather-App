import "./Navbar.css";
import searchIcon from "../../assets/search-icon.svg";
import { useState } from "react";

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);

  const handleBurgerClick = () => {
    setNavActive(!navActive);
  };
  return (
    <nav id="navbar">
      <div className="nav_burger" onClick={handleBurgerClick}>
        <div
          className={`nav_burger_line nav_burger_line--1 ${
            navActive ? "active" : ""
          }`}
        ></div>
        <div
          className={`nav_burger_line nav_burger_line--2 ${
            navActive ? "active" : ""
          }`}
        ></div>
        <div
          className={`nav_burger_line nav_burger_line--3 ${
            navActive ? "active" : ""
          }`}
        ></div>
      </div>
      <img
        src={searchIcon}
        alt="Gray search icon"
        className="nav_search_icon"
      />
    </nav>
  );
};

export default Navbar;
