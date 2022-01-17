var cityFormEl = document.querySelector("#city-search")
var cityInputEl = document.querySelector("#city")
var cityContainerEl = document.querySelector("#current-container")
var searchHistoryEl = document.querySelector("#search-history")

// current weather elements
var currentCityEl = document.querySelector(".current-city")
var currentTempEl = document.querySelector(".current-temp")
var currentWindEl = document.querySelector(".current-wind")
var currentHumidityEl = document.querySelector(".current-humidity")
var currentUvEl = document.querySelector(".current-uv")

// forcast elements
var forcastDate = document.querySelector(".date")
var forcastIcon = document.querySelector(".weather-icon")
var forcastTemp = document.querySelector(".temp")
var forcastWind = document.querySelector(".wind")
var forcastHumidity = document.querySelector(".humidity")

// create array to hold cities for saving
var cities = []

// after clicking "search", this function is executed
var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var cityName = cityInputEl
        .value
        .trim() // removes any spaces

    if (cityName) {
        getCoord(cityName)
        cityInputEl.value = "" // removes the city name you just entered
    } else {
        alert("Please enter a City.") // alert user if they do not enter a city at all
    }
}
