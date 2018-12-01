var xhr = new XMLHttpRequest();
var msg = document.getElementById("msg");
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var latitude = pos.coords.latitude;
  var longitude = pos.coords.longitude;

  xhr.open('GET','https://fcc-weather-api.glitch.me/api/current?lon='+latitude+'&lat='+latitude);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var temp = JSON.parse(xhr.responseText);

      msg.innerHTML += '<h2 id="first">'+temp.sys.country+'</h2>';
      msg.innerHTML += '<h2 id="tempHeader">'+Math.floor(temp.main.temp)+' °C</h2>';
      msg.innerHTML += '<input id="C" type="radio" name="temp" value="C" checked><label>°C</label><input id="F"type="radio" name="temp" value="F"><label>°F</label>';
      msg.innerHTML += '<h2>'+temp.weather[0].description+'</h2>';
      msg.innerHTML += "<img src="+temp.weather[0].icon+">";

      var C = document.getElementById("C");
      var F = document.getElementById("F");
      var tempHeader = document.getElementById("tempHeader");

      C.addEventListener("click", function() {
        tempHeader.innerHTML = Math.floor(temp.main.temp)+' °C';
      });

      F.addEventListener("click", function() {
        tempHeader.innerHTML = (Math.floor(temp.main.temp)*(9/5)+32)+' °F';
      });

    } else {
      alert("failed!");
    }
  };
  xhr.send();
}

function error(err) {
  msg.innerText = "You have denied us from knowing your location, if you want to know the weather in your area then allow us to know your location.";
}

if ( navigator.geolocation ) {
  navigator.geolocation.getCurrentPosition(success, error, options);
}
