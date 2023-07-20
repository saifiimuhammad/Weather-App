const search_bar = document.getElementById("search-bar");
const search_button = document.getElementById("search-button");
const image = document.querySelector(".weather-img");
const temp = document.getElementById("main-temp");
const info = document.getElementById("main-info");
const min_temp = document.getElementById("min-temp");
const max_temp = document.getElementById("max-temp");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".error-message");
const mainPage = document.querySelector(".main");

// Function

async function Weatherupdate(city){
// OpenWeather API
const api_key = "0ff5d554f94eb57279bb2fcabcf5f624";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

const weather_data = await fetch(`${url}`).then(response => response.json());

// 404 Error Code

if(weather_data.cod === `404`){
    location_not_found.style.display = "flex";
    mainPage.style.display = "none";
    // console.log(`Error`);
    return;
}

location_not_found.style.display = "none";
    mainPage.style.display = "flex";

// console.log(weather_data);

temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)} °C`;
info.innerHTML = `${weather_data.weather[0].description}`;
min_temp.innerHTML = `${Math.round(weather_data.main.temp_min - 273.15)} °C`;
max_temp.innerHTML = `${Math.round(weather_data.main.temp_max - 273.15)} °C`;
humidity.innerHTML = `${weather_data.main.humidity}%`;
wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

switch(weather_data.weather[0].main){
    case 'Haze':
        image.src = "/images/haze.png";
        break;
    case 'Clouds':
        image.src = "/images/cloud.png";
        break;
    case 'Clear':
        image.src = "/images/clear.png";
        break;
    case 'Mist':
        image.src = "/images/mist.png";
        break;
    case 'Rain':
        image.src = "/images/rain.png";
        break;
    case 'Snow':
        image.src = "/images/snow.png";
        break;
}

}

search_button.addEventListener('click', ()=>{
    Weatherupdate(search_bar.value);
});