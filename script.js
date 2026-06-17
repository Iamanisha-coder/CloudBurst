const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const errorMsg = document.getElementById('error-msg');

const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const iconBox = document.getElementById('weather-icon-box');
const quoteBox = document.getElementById('weather-quote');

// 🌟 Engine tracking smart contextual environmental quotes
function updateThemeIconAndQuote(weatherDesc) {
    const body = document.body;
    const desc = weatherDesc.toLowerCase();

    body.removeAttribute('data-theme');

    if (desc.includes('clear') || desc.includes('sunny')) {
        body.setAttribute('data-theme', 'sunny');
        iconBox.textContent = "☀️";
        quoteBox.innerText = '"Keep your face always toward the sunshine, and shadows will fall behind you."';
    } else if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('shower')) {
        body.setAttribute('data-theme', 'rainy');
        iconBox.textContent = "🌧️";
        quoteBox.innerText = '"Some people feel the rain. Others just get wet."';
    } else if (desc.includes('snow') || desc.includes('ice') || desc.includes('freeze')) {
        body.setAttribute('data-theme', 'snowy');
        iconBox.textContent = "❄️";
        quoteBox.innerText = '"To appreciate the beauty of a snowflake, it is necessary to stand out in the cold."';
    } else if (desc.includes('cloud') || desc.includes('overcast') || desc.includes('mist') || desc.includes('fog')) {
        body.setAttribute('data-theme', 'cloudy');
        iconBox.textContent = "☁️";
        quoteBox.innerText = '"Behind every cloud is another cloud... just kidding, there is a blue sky!"';
    } else {
        body.setAttribute('data-theme', 'default');
        iconBox.textContent = "✨";
        quoteBox.innerText = '"No matter what the weather looks like, have a beautiful day!"';
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

        // Update DOM metrics arrays
        cityName.innerText = `${areaInfo.areaName[0].value}, ${areaInfo.country[0].value}`;
        temperature.innerText = currentCondition.temp_C;
        description.innerText = currentCondition.weatherDesc[0].value;
        humidity.innerText = `${currentCondition.humidity}%`;
        wind.innerText = `${currentCondition.windspeedKmh} km/h`;

        // Update presentation layout components
        updateThemeIconAndQuote(currentCondition.weatherDesc[0].value);

        // Turn portal card elements visible
        errorMsg.style.display = "none";
        weatherInfo.style.display = "block";

    } catch (error) {
        console.error(error);
        weatherInfo.style.display = "none";
        errorMsg.style.display = "block";
        document.body.removeAttribute('data-theme');
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
