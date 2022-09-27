import "./Forecast.css";
import checkWeather from "../util/CheckWeather";
import { WeatherContext } from "../WeatherContext";
import { useContext, useEffect, useState } from "react";

const Forecast = () => {
  const [forecastData, setForecastData] = useState("");

  const { weatherForecastData, nightTime } = useContext(WeatherContext);

  const threeDays = weatherForecastData.list;

  /////////////////////
  // Set The Forecast //
  /////////////////////
  const setForecast = () => {
    try {
      setForecastData(
        // Only get 3 days from data
        threeDays.filter((day) => day.dt_txt.includes("18:00:00"))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (weatherForecastData.length !== 0) {
      setForecast();
    }
  }, [weatherForecastData]);

  return (
    <section id="forecast_container">
      {forecastData &&
        forecastData.map((day, i) => {
          // Safari && IE Date bug solution
          let forecastDay = new Date(day.dt_txt.replace(/-/g, "/"))
            .toString()
            .slice(0, 3);

          return (
            <div
              key={i}
              className={`forecast_card ${nightTime ? "nightcard" : ""}`}
            >
              <img
                src={checkWeather(day.weather[0].id)}
                alt={`${day.weather[0].main} icon`}
                className="forecast_card_img"
              />
              <p className="forecast_card_temp">{Math.floor(day.main.temp)}°</p>
              <p className="forecast_card_day">{forecastDay}</p>
            </div>
          );
        })}
    </section>
  );
};

export default Forecast;
