import "./Main.css";
import Navbar from "../Navbar";
import CityDetails from "../CityDetails";
import Forecast from "../Forecast";
const Main = () => {
  return (
    <main id="main">
      <Navbar />
      <CityDetails />
      <Forecast />
    </main>
  );
};

export default Main;
