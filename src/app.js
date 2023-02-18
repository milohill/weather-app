import './style.css';

import Converter from 'node-temperature-converter';

// const test = new Converter.Kelvin(200);
// const data = test.toCelsius();

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
const button = document.querySelector('button');
const container = document.querySelector('.search-result-container');

let arr;

container.addEventListener('click', (e) => {
  if (e.target.classList[0] === 'search-result') {
    const { index } = e.target.dataset;
    const obj = arr[index];
    const { lat, lon } = obj;
    console.log(lat, lon);
    fetchWeatherData(lat, lon).then(res => {
      console.log(res);
    });
  }
});

async function updateSearchResult() {
  arr = await fetchGeoData(input.value);
  console.log(arr);
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

// button.addEventListener('click', async () => {
//   const keyword = input.value;
//   const geoData = await fetchGeoData(keyword);
//   const { lat, lon } = geoData[0];
//   const weatherData = await fetchWeatherData(lat, lon);
//   console.log(weatherData);
// });
