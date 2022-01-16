const express = require("express");
const bodyParser = require('body-parser');

const https = require("https");

const app = express();
app.use(express.static("body"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000,function () {
  console.log("Server is running at port 3000 ...");
});

app.get("/",function (req , res) {
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function (req,res) {
  var myLoc = req.body.Location;
  console.log(myLoc);
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+myLoc+"&appid=f524a8a86d357e1506ba93701f9afdb6&units=metric";
  https.get(url,function (response) {
    console.log(response.statusCode);
    response.on("data",function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const des = weatherData.weather[0].description;
      console.log(temp);
      res.write("<p>The Temperature is : "+temp+" degree f/c </p>");
      res.write("<h1>The Weather is currently "+des+"</h1>");
      res.send();
    });
  });
});
