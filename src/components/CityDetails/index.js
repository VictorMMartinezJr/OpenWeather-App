import "./CityDetails.css";
import { useEffect, useState } from "react";
import checkWeather from "../util/CheckWeather";
import wind from "../../assets/wind.svg";

const CityDetails = () => {
  const [city, setCity] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [temp, setTemp] = useState("");
  const [weatherCode, setWeatherCode] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [humidity, setHumidity] = useState("");
  const [pressure, setPressure] = useState("");
  const [time, setTime] = useState("");

  const capitalizeLetter = (str) => {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  };
  const insertDecimal = (num) => {
    return (+num / 100).toFixed(2);
  };

  ///////////////////////
  // Fetch The weather //
  ///////////////////////
  const getWeather = async () => {
    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
      );
      const data = await resp.json();
      setCity(data.name);
      setWeatherCode(data.weather[0].id);
      setWeatherDescription(capitalizeLetter(data.weather[0].description));
      setTemp(Math.floor(data.main.temp));
      setWindSpeed(Math.floor(data.wind.speed));
      setWeatherType(data.weather[0].main);
      setHumidity(data.main.humidity);
      setPressure(insertDecimal(data.main.pressure));
      setTime(data.weather[0].icon);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <section className="details_container">
      <div className="details_header">
        <h1 className="details_city">{city}</h1>
        <p className="details_weather_description">{weatherDescription}</p>
        <img
          src={checkWeather(weatherCode, time)}
          alt=""
          className="details_img"
        />
      </div>
      <div className="details_weather_info_container">
        <div className="detail_weather_info_container">
          <img
            src={checkWeather(weatherCode, time)}
            alt="wind icon"
            className="detail_weather_info_img"
          />
          <p className="detail_weather_info_text">{weatherType}</p>
        </div>
        <p className="details_weather_info_temp">
          {temp}
          <span className="degrees-icon">°</span>
        </p>
        <div className="detail_weather_info_container">
          <img src={wind} alt="wind icon" className="detail_weather_info_img" />
          <p className="detail_weather_info_text">{windSpeed} mph</p>
        </div>
      </div>
      <div className="details_weather_info_container">
        <div className="detail_weather_info_container">
          <p
            className={`detail_weather_info_indicator detail_weather_info_indicator--humidity ${
              humidity <= 55 ? "low" : "high"
            }`}
          >
            {humidity <= 55 ? "Low" : "High"}
          </p>
          <p className="detail_weather_info_text">Humidity</p>
        </div>
        <div className="detail_weather_info_container">
          <p
            className={`detail_weather_info_indicator detail_weather_info_indicator--humidity ${
              windSpeed >= 40 ? "high" : "low"
            }`}
          >
            {windSpeed >= 40 ? "High" : "Low"}
          </p>
          <p className="detail_weather_info_text">Wind Speed</p>
        </div>
        <div className="detail_weather_info_container">
          <p
            className={`detail_weather_info_indicator detail_weather_info_indicator--humidity ${
              pressure <= 30 ? "low" : "high"
            }`}
          >
            {pressure <= 30 ? "Low" : "High"}
          </p>
          <p className="detail_weather_info_text">Pressure</p>
        </div>
      </div>
    </section>
  );
};

export default CityDetails;
