import { useState, createContext, useEffect } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState("atlanta");
  const [url, setUrl] = useState(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
  );

  ///////////////////////
  // Fetch The weather //
  ///////////////////////
  const getWeather = async () => {
    const resp = await fetch(url);
    const data = await resp.json();
    setWeatherData(data);
  };

  useEffect(() => {
    getWeather();
  }, [city, url]);

  return (
    <WeatherContext.Provider value={{ weatherData, setCity, url, setUrl }}>
      {children}
    </WeatherContext.Provider>
  );
};
