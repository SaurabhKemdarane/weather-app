const apiID = "fd9dc91624c151ec1c24527b60d2f050";
const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
let latitude;
let longitude;
const url2 = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiID}`;
const search = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search button");
let icon = document.querySelector(".weather-img");
const locationBtn = document.querySelector("#btnLocation");
const weatherDiv = document.querySelector(".weather");

function resetPlaceholder() {
    search.placeholder = "Enter city name";
}

async function fetchWeatherByCity(city) {
    try {
        const response = await fetch(`${url}${city}&appid=${apiID}`);
        if (response.status === 404) {
            search.placeholder = "City not found";
            hideWeather();
            setTimeout(() => {
                resetPlaceholder();
            }, 3000);
        } else {
            const data = await response.json();
            displayWeather(data);
            setHideWeatherTimeout();
        }
    } catch (error) {
        alert("An error occurred while fetching weather data.");
        console.error(error);
    }
}

async function fetchWeather(lat, lon) {
    try {
        const response = await fetch(`${url2}&lat=${lat}&lon=${lon}`);
        const data = await response.json();
        displayWeather(data);
        setHideWeatherTimeout();
    } catch (error) {
        alert("An error occurred while fetching weather data.");
        console.error(error);
    }
}

function displayWeather(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&deg;C";
    document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    console.log(data.weather[0].main);
    if (data.weather[0].main === "Clouds") {
        icon.src = "/weather-app-img/images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
        icon.src = "/weather-app-img/images/clear.png";
    } else if (data.weather[0].main === "Rain") {
        icon.src = "/weather-app-img/images/rain.png";
    } else if (data.weather[0].main === "Snow") {
        icon.src = "/weather-app-img/images/snow.png";
    } else if (data.weather[0].main === "Drizzle") {
        icon.src = "/weather-app-img/images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
        icon.src = "/weather-app-img/images/mist.png";
    }
    
    showWeather();
}

function showWeather() {
    weatherDiv.style.display = 'block';
    setTimeout(() => {
        weatherDiv.classList.remove('hide');
        weatherDiv.classList.add('show');
    }, 30); 
}

function hideWeather() {
    weatherDiv.classList.remove('show');
    weatherDiv.classList.add('hide');
    setTimeout(() => {
        weatherDiv.style.display = 'none';
    }, 500); 
}

function setHideWeatherTimeout() {
    setTimeout(() => {
        hideWeather();
    }, 5000);
}

function handleSearch() {
    const city = search.value.trim();
    if (city) {
        fetchWeatherByCity(city);
        search.value = "";
    } else {
        search.placeholder = "Please enter a city name";
        setTimeout(() => {
            resetPlaceholder();
        }, 3000);
    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    fetchWeather(latitude, longitude);
}

function showError(error) {
    if (error.PERMISSION_DENIED) {
        alert("Please allow location access.");
    } else {
        console.error(error.message);
    }
}

async function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
    console.log("Requesting location...");
}

searchBtn.addEventListener("click", handleSearch);
search.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

locationBtn.addEventListener("click", getLocation);
