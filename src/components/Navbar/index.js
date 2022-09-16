import "./Navbar.css";
import searchIcon from "../../assets/search-icon.svg";
import { WeatherContext } from "../WeatherContext";
import { useState, useContext } from "react";

const Navbar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { setUrl, error } = useContext(WeatherContext);

  ////////////////////////////////////////
  // Only Submit if "enter" was clicked //
  ////////////////////////////////////////
  const checkEnterClicked = (e) => {
    if (e && e.keyCode === 13) {
      return true;
    } else {
      return false;
    }
  };

  /////////////////////////////////////
  // Show search input on icon click //
  /////////////////////////////////////
  const handleSearchClick = () => {
    if (!searchValue) {
      setSearchActive(!searchActive);
    }
  };

  /////////////////
  // Form Submit //
  /////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkEnterClicked(e)) {
      setUrl(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
      );
      setSearchValue("");
    }
  };
  return (
    <nav id="navbar">
      <form
        className="navbar__search__form"
        onSubmit={(e) => e.preventDefault()}
        onKeyUp={handleSubmit}
      >
        <button
          className="navbar__search__form__btn"
          onClick={handleSearchClick}
          type="button"
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
        <p
          className={`navbar__search__form__input_error ${
            error ? "active" : ""
          }`}
        >
          Invalid City
        </p>
      </form>
    </nav>
  );
};

export default Navbar;
