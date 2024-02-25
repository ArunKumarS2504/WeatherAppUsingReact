import React from 'react';
import './index1.css';
import { useState, useEffect, useCallback } from 'react';

const CombinedComponent = () => {

  const [searchInput, setSearchInput] = useState('');
  const [searchSuggest, setSearchSuggest] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentTime , setCurrentTime] = useState(new Date());
  const username = 'arun'; 
  const apiKey = "12ee85252afe4e4d9dfc93b6f7265924"; 

  useEffect(() => {
    const fetchSuggest = async () => {
      if (searchInput.trim() === '') {
        setSearchSuggest([]);
        
        return;
      }

      const url = `https://secure.geonames.org/postalCodeSearchJSON?placename_startsWith=${searchInput}&maxRows=10&username=${username}&country=IN`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setSearchSuggest(data.postalCodes);
      } catch (error) {
        console.error('Failed to fetch', error);
      }
    };

    fetchSuggest();
  }, [searchInput, username]);

  
  const fetchWeather = useCallback(async (lat, lng) => {
    if (!lat || !lng) return;
    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${apiKey}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data)

      if (data && data.data && data.data.length > 0) {
        setWeatherData(data.data[0]);
      } else {
        console.log("No data returned from API");
      }
    } catch (error) {
      console.error('Failed to fetch: ', error);
    }

  }, [apiKey]);

  useEffect(() => {
   
    const savedLocation = JSON.parse(localStorage.getItem('selectedLocation'));
    if (savedLocation && savedLocation.lat && savedLocation.lng) {
      fetchWeather(savedLocation.lat, savedLocation.lng);
    } else {
     
      fetchWeather('40.7128', '-74.0060'); 
    }
  }, [fetchWeather]);


  const handleInput = (event) => {
    setSearchInput(event.target.value);
    setShowSuggestions(true);
  };

  const handleSelection = (suggest) => {
    fetchWeather(suggest.lat, suggest.lng);
    localStorage.setItem('selectedLocation', JSON.stringify({ lat: suggest.lat, lng: suggest.lng }));
    setSearchInput(suggest.placeName);
    setShowSuggestions(false);
  };


  useEffect(() =>{
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return() =>{
      clearInterval(intervalId);
    };
  },[]);




  return (
    <div className='main-container'>
      <div className='flex-row-a'>
        <div className='group' />
        <span className='weather-me'>WeatherMe</span>
        <div className='today'>
          <span className='today-1'>Today</span>
          <span className='nbsp'> </span>
        </div>
        <span className='tommorow'>Tommorow</span>
        <span className='monthly-forecast'>Monthly Forecast</span>
        <span className='pm'>{currentTime.toLocaleTimeString()}</span>
        <div className='line' />
      </div>
      <div className='flex-row-c'>
        <span className='celsius'>°C</span>
        <button className='rectangle'>
          <div className='ellipse' />
        </button>
        <span className='fahrenheit'>°F</span>
      </div>
      <div className='rectangle-2'>
        <input
          className="search-location" 
          type="text"
          value={searchInput}
          onChange={handleInput}
          placeholder="Search location..."
          onFocus={() => setShowSuggestions(true)}
           />
          {/* <button className="search-button">Search</button> */}
          {showSuggestions && (
        <ul className="suggestion-list">
          {searchSuggest.map((suggest, index) => (
            <li key={index} onClick={() => handleSelection(suggest)}>
              {suggest.placeName} 
            </li>
          ))}
          
        </ul>
          )}
        
        <div className='duck-icon-search' />
      </div>
      <div className='flex-row-bfa'>
        <div className='rectangle-3'>
          <div className='flex-row-f'>
          
            <span className='burdwan'>{weatherData ? weatherData.city_name : "Loading..."}</span>
            <div className='duck-icon-location' />
          </div>
          <div className='flex-row-b'>
            <span className='celsius-4'>{weatherData ? `${weatherData.temp}°C` : "..."}</span>
            <div className='duck-icon-temperature' />
            <div className='group-5' />
            <span className='aug-tue'>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className='flex-row-dc'>
            <span className='air-pressure'>Air pressure</span>
            <span className='humidity'>Humidity</span>
            <span className='visibility'>visibility</span>
          </div>
          <div className='flex-row-c-6'>
            <span className='percentage'>{weatherData ? `${weatherData.rh}%` : "..."}</span>
            <span className='kilometers'>{weatherData ? `${weatherData.vis} km` : "..."}</span>
            <span className='pressure'>{weatherData ? `${weatherData.pres} hPa` : "..."}</span>
          </div>
        </div>
        <div className='rectangle-7' />
        <div className='rectangle-8' />
        <div className='chevron-left-arrow' />
        <div className='chevron-left-arrow-9' />
        <span className='wind'>Wind</span>
        <span className='mph'>{weatherData ? `${weatherData.wind_spd} m/s` : "..."}</span>
      </div>
      <div className='flex-row-e'>
        <div className='rectangle-a'>
          <span className='time'>19:00 pm</span>
          <div className='dark-cloud' />
        </div>
        <div className='rectangle-b'>
          <span className='time-c'>21:00 pm</span>
          <div className='group-d' />
        </div>
        <div className='rectangle-e'>
          <span className='time-23-pm'>23:00pm</span>
          <div className='group-f' />
        </div>
        <div className='rectangle-10'>
          <span className='time-1-am'>1:00am</span>
          <div className='group-11' />
        </div>
        <div className='rectangle-12'>
          <span className='time-3-am'>3:00am</span>
          <div className='group-13' />
        </div>
        <div className='rectangle-14'>
          <span className='time-5-am'>5:00am</span>
          <div className='group-15' />
        </div>
        <div className='rectangle-16'>
          <span className='time-7-am'>7:00am</span>
          <div className='group-17' />
        </div>
        <div className='rectangle-18'>
          <div className='group-19' />
          <div className='group-1a' />
          <span className='temperature-29'>29°</span>
        </div>
        <div className='rectangle-1b'>
          <span className='temperature-27'>27°</span>
        </div>
        <div className='rectangle-1c'>
          <span className='temperature-27-1d'>27°</span>
        </div>
        <div className='rectangle-1e'>
          <span className='temperature-26'>26°</span>
        </div>
        <div className='rectangle-1f'>
          <span className='temperature-29-20'>29°</span>
        </div>
        <div className='rectangle-21'>
          <span className='temperature-31'>31°</span>
        </div>
        <div className='rectangle-22'>
          <span className='temperature-27-23'>27°</span>
        </div>
      </div>
    </div>
  );
};
export default CombinedComponent;
