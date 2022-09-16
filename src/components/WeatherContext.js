import { useState, createContext, useEffect } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("atlanta");
  const [url, setUrl] = useState(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
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

  useEffect(() => {
    fetchWeather();
  }, [city, url]);

  return (
    <WeatherContext.Provider
      value={{ weatherData, setCity, url, setUrl, error }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
