const api = 'https://fcc-weather-api.glitch.me/api/current?';

$(function() {
  //Get latitude and longitude using ip address
  $.getJSON('https://geoip.nekudo.com/api/en/', function(json) {
    const lat = json.location.latitude;
    const lon = json.location.longitude;
    const url = `${api}lat=${lat}&lon=${lon}`;

    //Get location and weather conditions using latitude and longitude
    $.getJSON(url, function(get) {
        const city = get.name;
        const country = get.sys.country;
        const tempC = get.main.temp.toFixed(0);
        const  weather = get.weather[0].main;
        const icon = get.weather[0].icon;
      $('#location').html(`${city}, ${country}`);
      $('#weather').html(`${weather}</br><img src='${icon}' alt='Weather icon'/>`);

      //Toggle button to display temperature in selected unit
      const tempF = Math.round(parseInt(tempC) * 9 / 5 + 32);
      $('#temperature').text(`${tempC} C°`);
      $(function() {
        $('#unit-converter').change(function() {
          if ($(this).prop('checked')) {
            $('#temperature').html(`${tempF} F`);
          } else {
            $('#temperature').html(`${tempC} °C`);
          }
        });
      });

      //Change background image depending on weather
      const cloudyImage = 'images/clouds.jpg';
      const clearImage = 'images/clear.jpg';
      const snowImage = 'images/snow.jpg';
      let rainImage = 'images/rain.jpg';
      const nightClearImage = 'images/night_clear.jpg';
      const fogImage = 'images/fog.jpg';
      const mistImage = 'images/mist.jpg';

      if (weather == 'Clear') {
        $('body').css('background', 'url(' + clearImage + ')');
      } else if (weather == 'Clouds') {
        $('body').css('background', 'url(' + cloudyImage + ')');
      } else if (weather == 'Snow') {
        $('body').css('background', 'url(' + snowImage + ')');
      } else if (weather == 'Rain') {
        $('body').css('background', 'url(' + rainImage + ')');
      } else if (weather == 'Night-Clear') {
        $('body').css('background', 'url(' + nightClearImage + ')');
      } else if (weather == 'Fog') {
        $('body').css('background', 'url(' + fogImage + ')');
      } else if (weather == 'Mist') {
        $('body').css('background', 'url(' + mistImage + ')');
      }
    });
  });
});
