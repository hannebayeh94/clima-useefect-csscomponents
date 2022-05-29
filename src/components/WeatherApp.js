import { useEffect, useState } from "react";
import WeatherForm from "./WeatherForm";
import WeatherMainInfor from "./WeatherMainInfor";
import styles from "./weatherApp.module.css";
import Loading from "./loading";

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {

    loadInfor();
    
  }, []);


  useEffect(() => {


    document.title = `weather | ${weather?.location.name ?? ""}`;

    
  }, [weather])
  
  

  const loadInfor = async (city = "london") => {
    try {
      const request = await fetch(
        `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
      );

      const response = await request.json();

      setTimeout(() => {
        setWeather(response)
      }, 2000);
      
      console.log("respuesta", response);
    } catch (error) {}
  };

  const handleChangeCity = (city) => {
    setWeather(null);
    loadInfor(city);
  };

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleChangeCity} />
      {weather ? <WeatherMainInfor weather={weather} /> : <Loading />}
      
    </div>
  );
};

export default WeatherApp;
