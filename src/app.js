import './style.css';
import Converter from 'node-temperature-converter';

const APIkey = 'bec7f6138a2eed4f6069231dd5df8525';

async function fetchGeoData(keyword) {
  try {
    const data = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${keyword}&limit=5&appid=${APIkey}`
    );
    return data.json();
  } catch (err) {
    return err;
  }
}

async function fetchWeatherData(lat, lon) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
    );
    return data.json();
  } catch (err) {
    return err;
  }
}

const input = document.querySelector('input');
const container = document.querySelector('.search-result-container');
const weatherEl = document.querySelector('.weather');
const windEl = document.querySelector('.wind');
const temperatureEl = document.querySelector('.temperature');
const button = document.querySelector('.change-unit-button');

let arr;
let index;
let unit = true;

button.addEventListener('click', () => {
  console.log(unit);
  if (unit) {
    unit = false;
  } else {
    unit = true;
  }
  updateWeatherResult();
});

function updateWeatherResult() {
  const obj = arr[index];
  const { lat, lon } = obj;

  fetchWeatherData(lat, lon).then((res) => {
    const { main, weather, wind } = res;

    weatherEl.textContent = `weather: ${weather[0].description}`;
    windEl.textContent = `speed: ${wind.speed}, deg: ${wind.deg}, gust: ${wind.gust}`;
    temperatureEl.textContent = `feels like: ${
      unit
        ? new Converter.Kelvin(main.feels_like).toCelsius()
        : new Converter.Kelvin(main.feels_like).toFahrenheit()
    }, humidity: ${main.humidity}, temperature: ${
      unit
        ? new Converter.Kelvin(main.temp).toCelsius()
        : new Converter.Kelvin(main.temp).toFahrenheit()
    }`;
  });
}

container.addEventListener('click', (e) => {
  if (e.target.classList[0] === 'search-result') {
    index = e.target.dataset.index;
    updateWeatherResult();
  }
});

async function updateSearchResult() {
  arr = await fetchGeoData(input.value);
  container.innerHTML = '';
  arr.forEach((el, idx) => {
    const div = document.createElement('div');
    div.classList.add('search-result');
    div.dataset.index = idx;
    div.textContent = `${el.name}, ${el.country}, ${el.state}`;
    container.append(div);
  });
}

input.addEventListener('input', updateSearchResult);
