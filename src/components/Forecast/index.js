import "./Forecast.css";
import { useEffect, useState } from "react";
import cloudSVG from "../../assets/clouds.svg";
import rainSVG from "../../assets/raining.svg";
import thunderSVG from "../../assets/thunder.svg";
import sunSVG from "../../assets/sun.svg";
import snowflakeSVG from "../../assets/snowflake.svg";

const Forecast = () => {
  const [forecast, setForecast] = useState("");

  //////////////////////////////////////////////////
  // check what weather code is returned from API //
  //////////////////////////////////////////////////
  const checkWeather = (code) => {
    if (code >= 200 && code < 300) {
      return thunderSVG;
    }
    if (code < 600) {
      return rainSVG;
    }
    if (code >= 600 && code < 700) {
      return snowflakeSVG;
    }
    if (code >= 700 && code < 799) {
      return rainSVG;
    }
    if (code === 800) {
      return sunSVG;
    }
    if (code >= 801) {
      return cloudSVG;
    }
  };

  //////////////////////////////////
  // Fetch Forecast data from API //
  //////////////////////////////////
  const fetchForecast = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=atlanta&appid=${process.env.REACT_APP_API_KEY}&units=imperial&cnt=25`
      );
      const data = await res.json();
      const dataList = data.list;
      // Only get forecast for the next 3 days
      setForecast(dataList.filter((day) => day.dt_txt.includes("12:00:00")));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  return (
    <section id="forecast_container">
      {forecast &&
        forecast.map((day, i) => {
          console.log(day);
          return (
            <div key={i} className="forecast_card">
              <img
                src={checkWeather(day.weather[0].id)}
                alt={`${day.weather[0].main} icon`}
                className="forecast_card_img"
              />
              <p className="forecast_card_temp">{Math.floor(day.main.temp)}°</p>
              <p className="forecast_card_day">
                {new Date(day.dt_txt).toString().slice(0, 3)}
              </p>
            </div>
          );
        })}
    </section>
  );
};

export default Forecast;
