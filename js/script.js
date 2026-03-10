const inputCity = document.querySelector("#searchCity");
const searchBtn = document.querySelector("#searchBtn");

const cityOutput = document.querySelector("#cityOutput");
const temperature = document.querySelector("#temperature");
const weatherText = document.querySelector("#weatherText");

const wind = document.querySelector("#wind");
const humid = document.querySelector("#humid");

const icon = document.querySelector("#icon");

const API_KEY = "6319fd6668237480003eb459c097aa72";

async function getWeather() {

    const city = inputCity.value.trim();

    if (city === "") {
        alert("Enter city name first");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.cod !== 200) {
            alert("City not found");
            return;
        }

        cityOutput.innerText = weatherData.name;

        temperature.innerText = weatherData.main.temp + " °C";

        weatherText.innerText = weatherData.weather[0].description;

        wind.innerHTML = `${weatherData.wind.speed} km/h`;

        humid.innerHTML = `${weatherData.main.humidity} %`;

        const iconCode = weatherData.weather[0].icon;

        icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    }
    catch (error) {
        console.log(error);
        alert("Something went wrong");
    }

}

searchBtn.addEventListener("click", getWeather);

inputCity.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});