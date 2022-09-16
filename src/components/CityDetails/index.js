import "./CityDetails.css";
import { useEffect, useState, useContext } from "react";
import { WeatherContext } from "../WeatherContext";
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

  const { weatherData } = useContext(WeatherContext);

  const capitalizeLetter = (str) => {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  };
  const insertDecimal = (num) => {
    return (+num / 100).toFixed(2);
  };

  /////////////////////
  // Set The weather //
  /////////////////////
  const setWeather = () => {
    try {
      setWeatherCode(weatherData.weather[0].id);
      setCity(weatherData.name);
      setWeatherDescription(
        capitalizeLetter(weatherData.weather[0].description)
      );
      setTemp(Math.floor(weatherData.main.temp));
      setWindSpeed(Math.floor(weatherData.wind.speed));
      setWeatherType(weatherData.weather[0].main);
      setHumidity(weatherData.main.humidity);
      setPressure(insertDecimal(weatherData.main.pressure));
      setTime(weatherData.weather[0].icon);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (weatherData.length !== 0) {
      setWeather();
    }
  }, [weatherData]);

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
