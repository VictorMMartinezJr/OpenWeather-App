import "./Main.css";
import Navbar from "../Navbar";
import CityDetails from "../CityDetails";
import Forecast from "../Forecast";
import { WeatherContext } from "../WeatherContext";
import { useContext } from "react";

const Main = () => {
  const { nightTime } = useContext(WeatherContext);
  return (
    <main id="main" className={nightTime ? "nighttime" : "daytime"}>
      <Navbar />
      <CityDetails />
      <Forecast />
    </main>
  );
};

export default Main;
