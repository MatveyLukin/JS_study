const param = {
  url: "https://api.openweathermap.org/data/2.5/",
  appid: "5757ae0cda84d81cd095c197021be76a",
};

function getWeather() {
  const cityId = document.querySelector("#city").value;
  fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}
const cities = {
  3143244: "Oslo",
  3435907: "Buenos Aires",
  4183849: "Boston",
  1701667: "Manila",
};

function createSelector() {
  let select = document.createElement("select");
  select.id = "city";

  for (let key in cities) {
    let option = document.createElement("option");
    option.value = key;
    option.textContent = cities[key];
    select.append(option);
  }
  document.querySelector(".select").append(select);
}

createSelector();

function showWeather(data) {
  console.log(data);
  document.querySelector(".package-country").textContent = data.sys.country;
  document.querySelector(".package-city").textContent = data.name;
  document.querySelector(".temperature").innerHTML =
    Math.round(data.main.temp) + "&deg";
  document.querySelector(".disclaimer").textContent =
    data.weather[0]["description"];
  document.querySelector(
    ".features li"
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png">`;
  document.querySelector(".speed").innerHTML =
    "speed " + data.wind.speed + " m/s";
  document.querySelector(".humidity").innerHTML =
    "humidity " + data.main.humidity + " %";
  document.querySelector(".pressure").innerHTML =
    "pressure " + data.main.pressure + " kPa";
}

getWeather();
document.querySelector("#city").onchange = getWeather;
