const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const random = require('random-world');
const cities = [];
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')
let randomCity; 
app.get('/', (req, res) => {
  for (let i = 0; i < 8; i++) {
    randomCity = random.city();
    cities[i] = randomCity;
  }

  console.log(cities);
  res.render('home', {
    cities: cities,
  });
});


app.listen(port, ()=> {
  console.log(`Server running on port ${port}`);
});






























//api.openweathermap.org/data/2.5/weather?q=Abuja&appid=8aeb0b8987a14d50b54e3d719f94b3cf&units=metric

// api key 8aeb0b8987a14d50b54e3d719f94b3cf