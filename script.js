const myLocation = document.querySelector(".location");
const description = document.querySelector(".desc");
const temp = document.querySelector(".temp");
const error = document.querySelector(".error");
const feelsLike = document.querySelector(".feels");
const windSpeed = document.querySelector(".windspeed");
const humudity = document.querySelector(".humudity");
const body = document.querySelector("body");

const search = document.querySelector(".search");
const input = document.querySelector("input");

search.addEventListener("click", (e) => {
  e.preventDefault();

  async function getData() {
    let key = "da4f8a598ac89f15d1c4c285bd7702a0";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${key}`;
    try {
      let response = await fetch(url, { mode: "cors" });
      let json = await response.json();
      if (!response.ok) {
        throw new Error(response.status);
      }
      myLocation.textContent = json.name;
      temp.innerHTML = `${json.main.temp} &deg;C`;
      description.textContent = json.weather[0].description;
      feelsLike.innerHTML = `${json.main.feels_like} &deg;C`;
      windSpeed.textContent = `${json.wind.speed}km/h`;
      humudity.textContent = `${json.main.humidity}%`;
      let condition = json.weather[0].description;
      gitGiph(condition);
    } catch (response) {
      error.textContent = response;
    }
  }
  getData();

  async function gitGiph(condition) {
    const endpoint = `https://api.giphy.com/v1/gifs/translate?api_key=pczpmqXUW7IEEXVvWEvSHLlTXUFdheWN&s=${condition}`;
    const response = await fetch(endpoint, { mode: "cors" });
    const json = await response.json();
    let bg = json.data.images.original.url;
    body.style.background = `url(${bg})`;
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "cover";
  }

  input.value = "";
});
