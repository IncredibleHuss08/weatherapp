document.addEventListener('DOMContentLoaded', function() {
    const searchElement = document.querySelector('.search-bar');
    const buttonElement = document.querySelector('button');
    const cityNameElement = document.querySelector('.city');
    const tempElement = document.querySelector('.temp');
    const iconElement = document.querySelector('.icon');
    const descElement = document.querySelector('.description');
    const humidityElement = document.querySelector('.humidity');
    const windElement = document.querySelector('.wind');

    const KELVIN = 273;
    const API_KEY = 'cc0df5d2ed72775d6afc5d09f33a97a4';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

    // Function to display weather information on the webpage
    function showWeather(data) {
        cityNameElement.textContent = `Weather in ${data.name}`;
        tempElement.textContent = `${Math.floor(data.main.temp - KELVIN)}°C`;
        iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        descElement.textContent = data.weather[0].description;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
        windElement.textContent = `Wind speed: ${data.wind.speed}km/h`;
    }

    // Fetch weather data based on coordinates
    function fetchWeatherByCoords(latitude, longitude) {
        const url = `${API_URL}&lat=${latitude}&lon=${longitude}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => showWeather(data))
            .catch(() => {
                alert('Failed to fetch weather data');
            });
    }

    // Fetch weather data based on city name
    function fetchWeatherByCity(city) {
        const url = `${API_URL}&q=${city}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => showWeather(data))
            .catch(() => {
                alert('Please enter a valid city name');
            });
    }

    // Event listener for button click
    buttonElement.addEventListener('click', () => {
        const city = searchElement.value;
        fetchWeatherByCity(city);
    });

    // Event listener for Enter key press in search bar
    searchElement.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
            const city = searchElement.value;
            fetchWeatherByCity(city);
        }
    });

    // Get geolocation and fetch weather data based on coordinates
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            () => {
                alert('Failed to get geolocation');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser');
    }
});