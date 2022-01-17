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

// gets coordinates of city entered in search bar 
var getCoord = function (city) {

    // format the OpenWeather API URL
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1b50cbb3b2c102d6f7def4cf1a1ea24d&units=imperial"
    // console.log(apiUrl)

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var lon = data.coord.lon
                var lat = data.coord.lat
                getWeather(lon, lat)

                var currentCity = data.name
                currentCityEl.textContent = currentCity

                if (!cities.includes(currentCity)) {
                    cities.push(currentCity) // push the currentCity into the cities array
                    saveToSearchHistory() // save to local storage
                    createButton(currentCity) // creates button for city under search history
                }
            })
        } else {
            alert("Error: City does no Exist Found. Please check your spelling.")
        }
    })
        .catch(function (error) {
            alert("Unable to connect to Open Weather Servers")
        })
}

// after getting the city coordinates, then we can fetch the "One Call API"
var getWeather = function (lon, lat) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=1b50cbb3b2c102d6f7def4cf1a1ea24d&units=imperial"
    // console.log(apiUrl)

    // make a request to the url
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrentWeather(data)
            })
        } else {
            alert("Error: City does not exist. Please check your spelling.")
        }
    })
        .catch(function (error) {
            alert("Unable to connect to Open Weather Servers")
        })
}