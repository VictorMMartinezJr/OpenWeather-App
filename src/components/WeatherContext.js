import { useState, createContext, useEffect } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [weatherForecastData, setWeatherForecastData] = useState([]);
  const [url, setUrl] = useState(
    `https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
  );
  const [forecastUrl, setForecastUrl] = useState(
    `https://api.openweathermap.org/data/2.5/forecast?q=atlanta&appid=${process.env.REACT_APP_API_KEY}&units=imperial&cnt=25`
  );
  const [error, setError] = useState(false);

  ///////////////////////
  // Fetch The weather //
  ///////////////////////
  const fetchWeather = async () => {
    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const data = await resp.json();
        setWeatherData(data);
        error && setError(false); // Clear Error if error is active
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /////////////////////////
  // Fetch The Forecast //
  ///////////////////////
  const fetchForecast = async () => {
    try {
      const resp = await fetch(forecastUrl);
      if (resp.ok) {
        const data = await resp.json();
        setWeatherForecastData(data);
        error && setError(false); // Clear Error if error is active
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWeather();
    fetchForecast();
  }, [url, forecastUrl]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        weatherForecastData,
        url,
        setUrl,
        setForecastUrl,
        error,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
