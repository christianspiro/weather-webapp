window.onload = () => {
    //btn function
    let tempBool = true;
    const btn = document.getElementById("change-unit");
    const bgColors = {
      freezing: "#6C8484",
      cold: "#364A77",
      cool: "#B28D45",
      warm: "#B27645"
    };
  
    const changeBg = cTemp => {
      if (cTemp >= 15) {
        document.body.style.backgroundColor = bgColors.warm;
      } else if (cTemp >= 0) {
        document.body.style.backgroundColor = bgColors.cool;
      } else if (cTemp >= -5) {
        document.body.style.backgroundColor = bgColors.cold;
      } else if (cTemp >= -15) {
        document.body.style.backgroundColor = bgColors.freezing;
      }
    };
  
    const changeUnits = cTemp => {
      changeBg(cTemp);
      btn.addEventListener("click", () => {
        if (tempBool === true) {
          document.querySelector(".temp").innerHTML =
            Math.round(cTemp * (9 / 5) + 32) + "°F";
          tempBool = false;
        } else if (tempBool === false) {
          document.querySelector(".temp").innerHTML = Math.round(cTemp) + "°C";
          tempBool = true;
        }
      });
    };
  
    const weatherUpdate = (x, y) => {
      let api =
        "https://fcc-weather-api.glitch.me/api/current?lon=" + y + "&lat=" + x;
      fetch(api)
        .then(function(response) {
          return response.json();
        })
        .then(function(weatherJson) {
          document.querySelector(".icon").innerHTML =
            "<img src=" + weatherJson.weather[0].icon + " ></img>";
          document.querySelector(".location").innerHTML = weatherJson.name;
          document.querySelector(".temp").innerHTML =
            Math.round(weatherJson.main.temp) + "°C";
          temp = Math.round(weatherJson.main.temp);
          changeUnits(weatherJson.main.temp);
        });
    };
  
    const posCurrent = position => {
      let x = position.coords.latitude;
      let y = position.coords.longitude;
      weatherUpdate(x, y);
    };
  
    const getWeather = position => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          posCurrent(position);
        });
      } else {
        alert("Not supported on this browser");
      }
    };
  
    getWeather();
  };
  