const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const errorMsg = document.getElementById('error-msg');

const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

// Helper function to dynamically shift background themes
function updateTheme(weatherDesc) {
    const body = document.body;
    const desc = weatherDesc.toLowerCase();

    // Reset themes first
    body.removeAttribute('data-theme');

    if (desc.includes('clear') || desc.includes('sunny')) {
        body.setAttribute('data-theme', 'sunny');
    } else if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('shower')) {
        body.setAttribute('data-theme', 'rainy');
    } else if (desc.includes('snow') || desc.includes('ice') || desc.includes('freeze')) {
        body.setAttribute('data-theme', 'snowy');
    } else if (desc.includes('cloud') || desc.includes('overcast') || desc.includes('mist') || desc.includes('fog')) {
        body.setAttribute('data-theme', 'cloudy');
    } else {
        body.setAttribute('data-theme', 'default');
    }
}

async function checkWeather(city) {
    if (!city) return;

    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        const currentCondition = data.current_condition[0];
        const areaInfo = data.nearest_area[0];

        // Update DOM elements
        cityName.innerText = `${areaInfo.areaName[0].value}, ${areaInfo.country[0].value}`;
        temperature.innerText = currentCondition.temp_C;
        description.innerText = currentCondition.weatherDesc[0].value;
        humidity.innerText = `${currentCondition.humidity}%`;
        wind.innerText = `${currentCondition.windspeedKmh} km/h`;

        // Change the background theme based on description string
        updateTheme(currentCondition.weatherDesc[0].value);

        // Toggle visibility
        errorMsg.style.display = "none";
        weatherInfo.style.display = "block";

    } catch (error) {
        console.error(error);
        weatherInfo.style.display = "none";
        errorMsg.style.display = "block";
        document.body.removeAttribute('data-theme'); // Reset to black on error
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(cityInput.value.trim());
});

cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        checkWeather(cityInput.value.trim());
    }
});
