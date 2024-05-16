import React, { useEffect, useState } from "react";
import '../src/App.css';

function App() {

  const [cityName, setCityName] = useState('');
  const [weatherReport, setWeatherReport] = useState([]);
  const [bool, setbool] = useState(false);

  async function getWeatherReport() {
    try {
      setbool(true);
      if (cityName.length > 0) {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?Key=34d1bf411dfc4017a5a50908241505&q=${cityName}`)
        const data = await response.json();
        setWeatherReport(data)
        console.log('data', data);
      }
    }
    catch (err) {
      alert('Failed to fetch weather data');
    }
  }

  function Alert() {
    setWeatherReport([]);
    setbool(false)
    alert('Failed to fetch weather data')
  }

  // useEffect(() => {
  //   getWeatherReport();
  // }, [cityName])

  console.log(cityName)


  return (
    <div >
      <div className="inputcontainer" >
        <input type="text" placeholder="Enter city name" value={cityName} onChange={(e) => setCityName(e.target.value.toLocaleLowerCase())}></input>
        <button onClick={() => getWeatherReport(cityName)}>Search</button>
      </div>

      {
        weatherReport.length == 0 && bool == false ? null :
          weatherReport.length == 0 && bool == true
            ?
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Loading data...</div>
            :
            weatherReport.hasOwnProperty("current") 
            ?
              <div className="weather-cards">
                < div className="weather-card">
                  <p className="heading">Temprature</p>
                  <p className="report">{weatherReport.current.temp_c}°C</p>
                </div>
                < div className="weather-card">
                  <p className="heading">Humidity</p>
                  <p className="report">{weatherReport.current.humidity}%</p>
                </div>
                < div className="weather-card">
                  <p className="heading">Condition</p>
                  <p className="report">{weatherReport.current.condition.text}</p>
                </div>
                < div className="weather-card">
                  <p className="heading">Wind Speed</p>
                  <p className="report">{weatherReport.current.wind_kph} kph</p>
                </div>
              </div> : Alert()
      }

      {/* {
        weatherReport.length == 0
          ?
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Loading data...</div>
          :
          weatherReport.hasOwnProperty("current")
            ?
            <div className="container">
              < div className="weather-cards">
                <p className="heading">Temprature</p>
                <p className="report">{weatherReport.current.temp_c}°C</p>
              </div>
              < div className="weather-cards">
                <p className="heading">Humidity</p>
                <p className="report">{weatherReport.current.humidity}%</p>
              </div>
              < div className="weather-cards">
                <p className="heading">Condition</p>
                <p className="report">{weatherReport.current.condition.text}</p>
              </div>
              < div className="weather-cards">
                <p className="heading">Wind Speed</p>
                <p className="report">{weatherReport.current.wind_kph} kph</p>
              </div>
            </div> : Alert()
      } */}



    </div >
  );
}

export default App;
