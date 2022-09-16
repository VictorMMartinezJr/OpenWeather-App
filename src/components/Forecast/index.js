import "./Forecast.css";
import checkWeather from "../util/CheckWeather";
import { WeatherContext } from "../WeatherContext";
import { useContext, useEffect, useState } from "react";

const Forecast = () => {
  const [forecastData, setForecastData] = useState("");

  const { weatherForecastData } = useContext(WeatherContext);

  const threeDays = weatherForecastData.list;

  /////////////////////
  // Set The Forecast //
  /////////////////////
  const setForecast = () => {
    try {
      setForecastData(
        threeDays.filter((day) => day.dt_txt.includes("12:00:00"))
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (weatherForecastData.length !== 0) {
      setForecast();
    }
  }, [weatherForecastData]);

  // Safari && IE Date bug solution
  const fixDateForAllBrowsers = (dateString) => dateString.replace(/-/g, "/");

  return (
    <section id="forecast_container">
      {forecastData &&
        forecastData.map((day, i) => {
          return (
            <div key={i} className="forecast_card">
              <img
                src={checkWeather(day.weather[0].id)}
                alt={`${day.weather[0].main} icon`}
                className="forecast_card_img"
              />
              <p className="forecast_card_temp">{Math.floor(day.main.temp)}°</p>
              <p className="forecast_card_day">
                {fixDateForAllBrowsers(
                  new Date(day.dt_txt).toString().slice(0, 3)
                )}
              </p>
            </div>
          );
        })}
    </section>
  );
};

export default Forecast;
