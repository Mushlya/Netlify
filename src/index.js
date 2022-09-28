displayCurrentDayTime();

function displayCurrentDayTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = "0" + currentHour;
  }
  let currentMinute = now.getMinutes();
  if (currentMinute < 10) {
    currentMinute = "0" + currentMinute;
  }
  let currentDayTime = currentDay + " " + currentHour + ":" + currentMinute;
  let dayTimeElement = document.querySelector("#dayTime");
  dayTimeElement.innerHTML = currentDayTime;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getWeatherAtEnteredLocation);

function getLocation() {
  navigator.geolocation.getCurrentPosition(showWeatherHere);
}

function showWeatherHere(position) {
  let apiKey = "0cf6b60d58b0c697532c33384fe20a26";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getLocation);

function getWeatherAtEnteredLocation(event) {
  event.preventDefault();

  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  let apiKey = "0cf6b60d58b0c697532c33384fe20a26";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let returnedTemperature = Math.round(response.data.main.temp);
  let returnedCity = response.data.name;
  let returnedCloudCover = response.data.clouds.all;
  let returnedHumidity = response.data.main.humidity;
  let returnedWind = response.data.wind.speed;

  console.log(returnedTemperature);
  let city = document.querySelector("#city");
  city.innerHTML = returnedCity;
  let tempr = document.querySelector("#temperature-degree");
  tempr.innerHTML = returnedTemperature;
  let cloudCover = document.querySelector("#CloudCover");
  let humidity = document.querySelector("#Humidity");
  let wind = document.querySelector("#Wind");
  cloudCover.innerHTML = "Cloud cover: " + returnedCloudCover + "%";
  humidity.innerHTML = "Humidity: " + returnedHumidity + "%";
  wind.innerHTML = "Wind: " + returnedWind + " km/h";
}

let fLink = document.querySelector("#f-link");
fLink.addEventListener("click", displayF);

let cLink = document.querySelector("#c-link");
cLink.addEventListener("click", displayC);

function displayC() {
  let temperatureElement = document.querySelector("#temperature-degree");
  temperatureElement.innerHTML = 17;
  let temperatureScale = document.querySelector("#temperature-scale");
  temperatureScale.innerHTML = "°C";
  displayCurrentDayTime();
}

function displayF() {
  let temperatureElement = document.querySelector("#temperature-degree");
  temperatureElement.innerHTML = 62;
  let temperatureScale = document.querySelector("#temperature-scale");
  temperatureScale.innerHTML = "°F";
  displayCurrentDayTime();
}

let apiKey = "0cf6b60d58b0c697532c33384fe20a26";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showTemperature);
