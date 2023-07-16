const apiKey = "&units=imperial&appid=bd4f68a84873628cc33e93c209af4eb4"
const weather = document.getElementById("weather")
const form = document.querySelector("form")
const br = document.createElement("br")
let city

form.onsubmit = async function (e) {
  e.preventDefault()
  const URL = "https://api.openweathermap.org/data/2.5/weather?q="
  city = form.search.value.trim()
  if (!city) return
  form.search.value = ""

 const fullURL = `${URL}${city}${apiKey}`

  try {
    const response = await fetch(fullURL)
    const data = await response.json()
    broadcast(data)
  } catch {
    weather.innerHTML = `<p style="font-size: xx-large">Location not found</p>`
  }}

function broadcast({
  name,
  sys: { country },
  coord: { lat, lon },
  weather: [{ icon, description }],
  main: { temp, feels_like },
  dt
}) {
  const locationMap = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

  weather.innerHTML = `
    <h2>${name}, ${country}</h2>
    <a href="${locationMap}" target="_BLANK">Click to view map</a>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <p style="text-transform: capitalize">${description}</p>
    <p>Current: ${temp}° F</p>
    <p>Feels like: ${feels_like}° F</p>
    <p>Last updated: ${new Date(dt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })}</p>
  `;
}


