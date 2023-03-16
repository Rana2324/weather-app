function $(sel) {
  return document.querySelector(sel);
}

const key = "b5f55662edbac04ac2ec0d92217d1f1a";
let weatherInfo = {};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      console.log(coords);
      const lat = coords.latitude;
      const lon = coords.longitude;
      let uri = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
      fetch(uri)
        .then((response) => response.json())
        .then((data) => {
          // data(data);
          const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          const cityAndCountry = data.name + "," + data.sys.country;
          const condition = data.weather[0].description;
          const celsiusTemp = data.main.temp - 273.15;
          const pressure = data.main.pressure;
          const humidity = data.main.humidity;

          weatherInfo = {
            icon,
            cityAndCountry,
            condition,
            celsiusTemp,
            pressure,
            humidity,
          };
        })
        .catch((error) => console.log(error))
        .finally(() => {
          displayToUi(weatherInfo);
        });
    },
    (error) => {
      let uri = `https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=${key}`;
      fetch(uri)
        .then((response) => response.json())
        .then((data) => {
          // data(data);
          const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          const cityAndCountry = data.name + "," + data.sys.country;
          const condition = data.weather[0].description;
          const celsiusTemp = data.main.temp - 273.15;
          const pressure = data.main.pressure;
          const humidity = data.main.humidity;
          weatherInfo = {
            icon,
            cityAndCountry,
            condition,
            celsiusTemp,
            pressure,
            humidity,
          };
        })
        .catch((error) => console.log(error))
        .finally(() => {
          displayToUi();
        });
    }
  );
}

// function data(data) {
//   const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
//   const cityAndCountry = data.name + "," + data.sys.country;
//   const condition = data.weather[0].description;
//   const celsiusTemp = data.main.temp - 273.15;
//   const pressure = data.main.pressure;
//   const humidity = data.main.humidity;

//   weatherInfo = {
//     icon,
//     cityAndCountry,
//     condition,
//     celsiusTemp,
//     pressure,
//     humidity,
//   };
// }
/* show data function */
function displayToUi() {
  $("#condition_icon").src = weatherInfo.icon;
  $(".city").innerHTML = weatherInfo.cityAndCountry;
  $(".condition").innerHTML = weatherInfo.condition;
  $("#temp").innerHTML = weatherInfo.celsiusTemp.toFixed(2);
  $("#pressure").innerHTML = weatherInfo.pressure;
  $("#humidity").innerHTML = weatherInfo.humidity;
}

$("#search_btn").addEventListener("click", () => {
  const searchCity = $("#search").value;
  let uri = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${key}`;
  fetch(uri)
    .then((response) => response.json())
    .then((data) => {
      // data(data);
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      const cityAndCountry = data.name + "," + data.sys.country;
      const condition = data.weather[0].description;
      const celsiusTemp = data.main.temp - 273.15;
      const pressure = data.main.pressure;
      const humidity = data.main.humidity;
      weatherInfo = {
        icon,
        cityAndCountry,
        condition,
        celsiusTemp,
        pressure,
        humidity,
      };
    })
    .catch((error) => console.log(error))
    .finally(() => {
      displayToUi();
    });
});
