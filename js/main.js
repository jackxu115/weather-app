objs = {
    body: null,
    inputCity: null,
    btnSearch: null,
    weatherData: null,
    eleWeather: {
        country: null,
        city: null,
        time: null,
        temperature: null,
        weather_description: null,
    },
    data: {
        country: null,
        city: null,
        time: null,
        temperature: null,
        weather_description: null,
    }
}


const apiKey = 'e2d66f0ea7f28c7d6ef3b184e914a141'

objs.body = document.querySelector('body')
objs.inputCity = document.querySelector('.searchBar input')
objs.btnSearch = document.querySelector('.searchBar button')
objs.weatherData = document.querySelector('.weatherData')

const cbInput = event => {
    if (event.key === 'Enter' && objs.inputCity.value.trim().toLowerCase()) {
        fetchData()
    }
}

const setKeyEvent = () => {
    objs.body.addEventListener('keyup', cbInput)
}


const fetchData = () => {
    const newCity = objs.inputCity.value.trim().toLowerCase() || 'delta'
    fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${newCity}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            cbWeatherData(data.location, data.current)
        })
}

const cbWeatherData = (location, weather) => {
    objs.data.city = location.name + ','
    objs.data.country = location.country
    objs.data.time = location.localtime
    objs.data.temperature = weather.temperature + String.fromCodePoint(8451)
    objs.data.weather_description = weather.weather_descriptions[0]
    createWeather(objs.data)
}

const createWeather = (data) => {
    objs.weatherData.innerHTML = ''
    for (const key in objs.eleWeather) {
        objs.eleWeather[key] = document.createElement('p')
        objs.eleWeather[key].className = key
        objs.eleWeather[key].classList.add('weather_data')
        objs.eleWeather[key].textContent = data[key]
        objs.weatherData.appendChild(objs.eleWeather[key])
    }



}

fetchData()
setKeyEvent()
objs.btnSearch.addEventListener('click', fetchData)