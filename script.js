const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const errorMsg = document.getElementById('error-msg');

const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

async function checkWeather(city) {
    if (!city) return;

    try {
        // Fetch JSON weather data from wttr.in format
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Extracting data from the wttr.in JSON architecture
        const currentCondition = data.current_condition[0];
        const areaInfo = data.nearest_area[0];

        // Update DOM elements
        cityName.innerText = `${areaInfo.areaName[0].value}, ${areaInfo.country[0].value}`;
        temperature.innerText = currentCondition.temp_C;
        description.innerText = currentCondition.weatherDesc[0].value;
        humidity.innerText = `${currentCondition.humidity}%`;
        wind.innerText = `${currentCondition.windspeedKmh} km/h`;

        // Toggle visibility
        errorMsg.style.display = "none";
        weatherInfo.style.display = "block";

    } catch (error) {
        console.error(error); // Logs the actual error to your browser console
        weatherInfo.style.display = "none";
        errorMsg.style.display = "block";
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(cityInput.value.trim());
});

// Changed from 'keypress' to 'keydown' for modern browser compatibility
cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkWeather(cityInput.value.trim());
    }
});
