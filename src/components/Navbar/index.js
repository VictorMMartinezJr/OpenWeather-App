import "./Navbar.css";
import searchIcon from "../../assets/search-icon.svg";
import { useState } from "react";

const Navbar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchClick = (e) => {
    e.preventDefault();
    setSearchActive(!searchActive);
    if (!searchActive) {
      setSearchValue("");
    }
  };
  return (
    <nav id="navbar">
      <form className="navbar__search__form">
        <button
          className="navbar__search__form__btn"
          onClick={handleSearchClick}
        >
          <img
            src={searchIcon}
            alt="Gray search icon"
            className="navbar__search__form__icon"
          />
        </button>
        <input
          className={`navbar__search__form__input ${
            searchActive ? "active" : ""
          }`}
          placeholder="Search for a city"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </form>
    </nav>
  );
};

export default Navbar;
