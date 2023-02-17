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

const keyword = document.querySelector('input');
const button = document.querySelector('button');

button.addEventListener('click', async () => {
  const index = keyword.value;
  const result = fetchGeoData(index);
  const geoData = await fetchGeoData(index);
  console.log(geoData);
});
