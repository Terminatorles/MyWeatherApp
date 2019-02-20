const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const apiKey ="29493160ccc5cd03ad169e19acf39b74";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extend:true}));

app.set('view engine', 'ejs')

app.get('/', function (req, res){
  res.render('index', {weather: null, error: null});
})


app.post('/', function (req, res){
  let city= req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  request(url, function(err, response, body){
    if (err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'})
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
        }
    }
  });
})


app.listen(8867, function () {
  console.log('weatherApp listening on port 8867!')
})
