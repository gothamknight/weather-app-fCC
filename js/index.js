$(document).ready(function() {
  var tempInFahrenheit;
  var tempInCelsius;
  var humidityOutput;
  var weatherDescription;
  var iconFromDS;
  var i = 1;
  

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //GET JSON FROM DARKSKY - only executes once

      $.getJSON("https://api.darksky.net/forecast/1faffbe567330877df62295c85b0b620/"+position.coords.latitude +"," + position.coords.longitude +"?callback=?",function(json) {
        
          weatherDescription = json.currently.summary.toLowerCase();
          tempInFahrenheit = Math.floor(json.currently.temperature) + "&#176";
          tempInCelsius = Math.floor((json.currently.temperature - 32) * 5 / 9) + "&#176";
          humidityOutput = "humidity: " + Math.round(json.currently.humidity * 100) + "%";
          iconFromDS = json.currently.icon;

          $("h3").data({
            fahrenheit: tempInFahrenheit,
            celsius: tempInCelsius
          }); //store temperatures in h3

          $("#description").html(weatherDescription);
          $("h5").html(humidityOutput);
          $("#temperature").html($("h3").data("fahrenheit"));
          $("button").html("F");
          $("#loading").remove();

          var imageURL = {
            snow: "https://res.cloudinary.com/dtwopb4fp/image/upload/v1492387513/snowing_vtmyap.jpg",
            partlyCloudyDay: "https://res.cloudinary.com/dtwopb4fp/image/upload/v1494536600/P7060048_whjbuk.jpg",
            cloudy: "https://res.cloudinary.com/dtwopb4fp/image/upload/v1492387147/cloudy_td3coi.jpg",
            partlyCloudyNight: "https://res.cloudinary.com/dtwopb4fp/image/upload/v1494533739/partly-cloudy-night_vgd3l0.jpg",
            clearNight: "https://res.cloudinary.com/dtwopb4fp/image/upload/c_scale,w_852/v1494557722/1_bqresl.jpg",
            clearDay: "https://res.cloudinary.com/dtwopb4fp/image/upload/v1494534147/ComputerDesktopWallpapersCollection965__043_qflqvg.jpg",
            fog: "https://res.cloudinary.com/dtwopb4fp/image/upload/v1494534694/prairie-sunrise-0041_r9jfb5.jpg",
            windy: "https://res.cloudinary.com/dtwopb4fp/image/upload/v1494535580/p_jaf0eo.jpg",
            rain: "https://res.cloudinary.com/dtwopb4fp/image/upload/v1494557575/cloud-494739_960_720_dtbumd.jpg",
            sleet: "https://res.cloudinary.com/dtwopb4fp/image/upload/v1494557667/209_brsmrh.jpg"
          };
        
          if (iconFromDS == "snow") {$("body").css("background-image", "url(" + imageURL.snow + ")");} 
          else if (iconFromDS == "partly-cloudy-day") {$("body").css("background-image","url(" + imageURL.partlyCloudyDay + ")");} 
          else if (iconFromDS == "cloudy") {$("body").css("background-image", "url(" + imageURL.cloudy + ")");} 
          else if (iconFromDS == "partly-cloudy-night") {$("body").css("background-image","url(" + imageURL.partlyCloudyNight + ")");} 
          else if (iconFromDS == "clear-night") {$("body").css("background-image","url(" + imageURL.clearNight + ")");} 
          else if (iconFromDS == "clear-day") {$("body").css("background-image", "url(" + imageURL.clearDay + ")")} 
          else if (iconFromDS == "fog") {$("body").css("background-image", "url(" + imageURL.fog + ")");} 
          else if (iconFromDS == "windy") {$("body").css("background-image", "url(" + imageURL.windy + ")");}
          else if (iconFromDS == "rain") {$("body").css("background-image", "url(" + imageURL.rain + ")");} 
          else if (iconFromDS == "sleet") {$("body").css("background-image", "url(" + imageURL.sleet + ")");} 
          else {$("body").css("background-image","url(https://cdn.wallpapersafari.com/49/55/h8HAkP.jpg)");
          $("#loading").remove();
          }
//skycons
          var skycons = new Skycons({ color: "white" });
          skycons.add(document.getElementById("weather-icon"),json.currently.icon);
          skycons.play();
        }
      ); //END OF GET DARKSKY JSON

      //GOOGLE API FOR LOCATION DATA
      $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+position.coords.longitude +"&key=AIzaSyD6JOdeJGbkxIFhnGlrxlhutAbSFEUR7zg",function(location) {
         
          var city;
          var country;
          var locationResult = location.results[0].address_components;
          var types;

          locationResult.forEach(function(object) {
            types = object.types.join(",");
            if (types == "locality,political") {
              city = object.long_name;
            }
            if (types == "country,political") {
              country = object.long_name;
            }
          }); //end of forEach function

          $("#location").html(city + ", " + country);
        }
      ); //END OF GOOGLE API
    }); //END OF GETCURRENTPOSITION
  }// END OF IF NAVIGATOR.GEOLOCATION
  else {
    $("h2").html("geolocation is NOT available");
    $("h3").html("");
  }
  $("button").on("click", function() {
    if (i == 1) {
      $("#temperature").html($("h3").data("celsius"));
      $("button").html("C");
      i = 0;
    } else if (i == 0) {
      $("#temperature").html($("h3").data("fahrenheit"));
      $("button").html("F");
      i = 1;
    }
  }); //END OF BUTTON CLICK FUNCTION
}); //END OF DOCUMENT READY FUNCTION