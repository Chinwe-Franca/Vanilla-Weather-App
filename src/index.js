let now = new Date();

let h2 = document.querySelector("h2");
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h2.innerHTML = `${day} ${date}, ${hours}:${minutes}`;

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let heading = document.querySelector("#city-name");
  let city = cityInput.value;
  heading.innerHTML = `${city}`;

  let apiKey = "1a29081cc503583e6ba95fa9014d848a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  function showTemperature(response) {
    let cityTemperature = response.data.main.temp;

    let cityTemp = Math.round(cityTemperature);
    let number = document.querySelector("#number");
    number.innerHTML = `${cityTemp}`;

    let weatherDescription = response.data.weather[0].description;
    let h2 = document.querySelector("#description");
    h2.innerHTML = `${weatherDescription}`;
    let humidity = response.data.main.humidity;
    let humidityValue = document.querySelector("#humidity");
    humidityValue.innerHTML = `${humidity}%`;
    let windSpeed = response.data.wind.speed;
    let wind = Math.round(windSpeed);
    let windValue = document.querySelector("#wind");
    windValue.innerHTML = `${wind} km/hr`;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  }
  axios.get(`${apiUrl}`).then(showTemperature);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", enterCity);
