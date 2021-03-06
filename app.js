const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const randomCities = require("all-the-cities");
const { static, response } = require("express");
const { indexOf, lastIndexOf } = require("lodash");

//Components
const cities = [];
const cardComponents = [];

//Globals
const apiKey = "8aeb0b8987a14d50b54e3d719f94b3cf";
const port = 3000;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(static("public"));

app.get("/", (req, res) => {
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * randomCities.length);
    cities[i] = _.upperCase(randomCities[randomIndex].name);
  }

  cities.forEach((city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    https.get(url, (response) => {
      let status = response.statusCode;
      response.on("data", (data) => {
        let weatherData = JSON.parse(data);
        // let cityWeather = weatherData.weather[0]
        cardComponents.push(status)
        console.log(cardComponents);
      });
    });
  });

  // console.log(cardComponents);

  res.render("home", {
    cities: cities,
  });
});

app.listen(port, () => {
  console.log(`Server open and listening at port ${port}`);
});

//api.openweathermap.org/data/2.5/weather?q=Abuja&appid=8aeb0b8987a14d50b54e3d719f94b3cf&units=metric

// api key 8aeb0b8987a14d50b54e3d719f94b3cf
