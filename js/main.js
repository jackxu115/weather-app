objs = {
    body: null,
    inputCity: null,
    btnSearch: null,
    weatherData: null
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
    console.log(objs.inputCity.value.trim().toLowerCase())
    const newCity = objs.inputCity.value.trim().toLowerCase() || 'delta'
    fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${newCity}`)
        .then(response => response.json())
        .then(data => console.log(data))
}

fetchData()
setKeyEvent()