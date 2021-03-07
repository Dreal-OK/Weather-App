const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const randomCities = require("all-the-cities");
const { static, response } = require("express");
const { indexOf, lastIndexOf, findIndex } = require("lodash");

//Components
let cities = ['New York', 'Lagos', 'Paris', 'Los Angeles', 'Havana', 'Moscow', 'Tokyo', 'Dubai', 'Abuja', 'Barcelona', 'Singapore', 'Medellin'];
let cardComponents = [];

//Globals
const apiKey = "8aeb0b8987a14d50b54e3d719f94b3cf";
const port = 3000;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(static("public"));

app.get("/", (req, res) => {
  // for (let i = 0; i < 8; i++) {
  //   const randomIndex = Math.floor(Math.random() * randomCities.length);
  //   cities[i] = _.upperCase(randomCities[randomIndex].name);
  // }

  // // for (let i = 0; i < cities.length; i++) {
  // //   let city = cities[i];
  // //    let url = `https://api.openweather.org/data/2.5/weather?q=Abuja&appid=${apiKey}&units=metric`;
  // //    https.get(url, response => {
  // //      response.on('data', data => {
  // //        let weatherData = JSON.parse(data);
  // //        cardComponents[i] = response.statusCode;
  // //      });
  // //    });
  // // };

  cities.forEach((city, cityIndex) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${_.lowerCase(city)}&appid=${apiKey}&units=metric`;
    https.get(url, (response) => {
      response.on("data", (data) => {
        let weatherData = JSON.parse(data);
        let weather = weatherData.weather[0];
        cardComponents[cityIndex] = weather;
      });
    });
  });




  // console.log(cardComponents);

  res.render("home", {
    cities: cities,
    cardComponents: cardComponents,
  });
});

app.listen(port, () => {
  console.log(`Server open and listening at port ${port}`);
});

//api.openweathermap.org/data/2.5/weather?q=Abuja&appid=8aeb0b8987a14d50b54e3d719f94b3cf&units=metric

// api key 8aeb0b8987a14d50b54e3d719f94b3cf
