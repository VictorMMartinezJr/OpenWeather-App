import "./Main.css";
import Navbar from "../Navbar";
import CityDetails from "../CityDetails";
import Forecast from "../Forecast";
import { WeatherProvider } from "../WeatherContext";
const Main = () => {
  return (
    <WeatherProvider>
      <main id="main">
        <Navbar />
        <CityDetails />
        <Forecast />
      </main>
    </WeatherProvider>
  );
};

export default Main;
