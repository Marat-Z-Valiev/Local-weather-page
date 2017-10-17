var api = "https://fcc-weather-api.glitch.me/api/current?";

$(document).ready(function(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      var lon = position.coords.longitude;
      var lat = position.coords.latitude;
      getWeather(lat, lon);
    })
  }
  //https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139
    
  function getWeather(lat, lon){
    $.getJSON(api + "lat=" + lat + "&lon=" + lon, function(get){
      var city = get.name,
      country = get.sys.country,
      tempC= get.main.temp.toFixed(0),
      weather = get.weather[0].main,
      icon = get.weather[0].icon;
      $("#location").html(city + ", " + country);
      $("#weather").html(weather + "</br>" + '<img src="' + icon + '"/>');
          
      //Toggle button to display temperature in selected unit
      var tempF = Math.round(parseInt(tempC) * 9 / 5 + 32);
      $("#temperature").text(tempC + " C°");      
      $(function() {
        $('#unit-converter').change(function(){
          if ($(this).prop('checked')){
            $('#temperature').html(tempF + " F");
          } else { 
            $('#temperature').html(tempC + " °C");
          }
        })
        })
      
      //Change background image depending on weather
      var cloudyImage = "https://image.ibb.co/dFdW6v/anime_clouds_sky.jpg",
        clearImage = "https://image.ibb.co/gQpDuF/clear.jpg",
        snowImage = "https://image.ibb.co/iVdGda/snow.jpg",
        rainImage = "https://image.ibb.co/mfyhJa/rain1.png",
        nightClearImage = "https://image.ibb.co/fhYGda/night_clear.jpg",
        fogImage = "https://image.ibb.co/cv7yrv/fog.jpg0";
      
      if(weather == "Clear"){
        $("body").css("background","url("+ clearImage +")");
      }
      else if(weather == "Cloudy"){
        $("body").css("background","url(" + cloudyImage + ")");
      }
      else if(weather == "Snow"){
        $("body").css("background","url("+ snowImage +")");
      }
      else if(weather == "Rain"){
        $("body").css("background","url("+ rainImage +")");
      }
      else if(weather == "Night-Clear"){
        $("body").css("background","url("+ nightClearImage +")");
      }
      else if(weather == "Fog"){
        $("body").css("background","url("+ fogImage +")");
      }
    })
  }
})