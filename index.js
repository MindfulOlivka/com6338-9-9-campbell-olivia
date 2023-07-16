const apiKey = "&units=imperial&appid=bd4f68a84873628cc33e93c209af4eb4"
const weather = document.getElementById("weather")
const form = document.querySelector("form")
const br = document.createElement("br")
let city

form.onsubmit = async function (e) {
  e.preventDefault()
  const URL = "https://api.openweathermap.org/data/2.5/weather?q="
  let city = form.search.value.trim(); 
  if (!city) return; 
  form.search.value = ""
  apiKeyString = `&units=imperial&appid=bd4f68a84873628cc33e93c209af4eb4${city}`
  fullUrl = URL + apiKeyString


  fetch(fullUrl)
    .then(function (res) {
      return res.json()       
    })
    .then(broadcast)

    .catch(function (err) {         
      const errMessage = document.createElement("p")
      errMessage.textContent = "Location not found"
      errMessage.style.fontSize = "xx-large"
      weather.appendChild(errMessage)
    });
};

const FindDate = time => {
    time = time * 1000
    const date = new Date(time)
  return time = date.toLocaleTimeString('en-US', {
    hour: "numeric",
    minute: "2-digit"
  })

}

const locationMap = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
function broadcast ({
    name,
    sys: {country},
    coord: {lat, lon},
    weather: [{
        0: {icon, description}
    }],
    main: {temp, feels_like},
    dt
}) {            
  weather.innerHTML = 
  <h2>${name}, ${country}</h2>
  <a href = "${locationMap}" target="_BLANK">Click to view map</a>
  <img src = "https://openweathermap.org/img/wn/${icon}@2x.png"></img>
  <p style="text-transform: capitalize;">${description}</p>
  <p>Current: ${temp} °F</p>     
  <p>Feels like: ${feels_like} °F</p>
  <p>Last updated: ${FindDate(dt)}</p>
}

