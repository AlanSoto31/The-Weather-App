import Store from './storage';

class UI {
  static printInfo() {
    const myObjStorage = JSON.parse(localStorage.getItem('myObjStorage'));
    document.getElementById('cityName').textContent = `${myObjStorage.name}, ${myObjStorage.sys.country}`;
    const xxx = document.getElementById('errorCon');
    xxx.innerHTML = `
    <div class="d-flex mid-con" id="tempCon">
      <div class="d-flex flex-column align-items-end mb-3">
        <h1 id="mainTemp" class="text-center display-4">${Math.round(myObjStorage.main.temp)} ${myObjStorage.unit}</h1>
        <button id="toggleDeg" class="btn p-1">°C<span class="px-1">/</span>°F</button>
      </div>
      <div class="text-center img-cont">
        <img src="http://openweathermap.org/img/wn/${myObjStorage.weather[0].icon}@4x.png" alt="" id="weatherImg" class="my-0">
        <p id="weatherDesc">${myObjStorage.weather[0].main}</p>
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-center" id="iconCon">
        <div class="d-flex justify-content-center align-items-center p-2"><i class="fas fa-temperature-low weather-icons"></i><span id="minTemp" class="ml-2">${Math.round(myObjStorage.main.temp_min)} ${myObjStorage.unit}</span></div>
        <div class="d-flex justify-content-center align-items-center p-2"><i class="fas fa-temperature-high weather-icons"></i><span id="maxTemp" class="ml-2">${Math.round(myObjStorage.main.temp_max)} ${myObjStorage.unit}</span></div>
        <div class="d-flex justify-content-center align-items-center p-2"><i class="fas fa-tint weather-icons"></i><span id="hum" class="ml-2">${Math.round(myObjStorage.main.humidity)} %</span></div>
    </div>
    `;
    document.getElementById('toggleDeg').addEventListener('click', UI.toggleDeg)
  }

  static toggleDeg() {
    const myObjStorage = JSON.parse(localStorage.getItem('myObjStorage'));
    if (myObjStorage.unit === '°F') {
      myObjStorage.main.temp = Math.round((myObjStorage.main.temp - 32) * (5 / 9));
      myObjStorage.main.temp_max = Math.round((myObjStorage.main.temp_max - 32) * (5 / 9));
      myObjStorage.main.temp_min = Math.round((myObjStorage.main.temp_min - 32) * (5 / 9));
      myObjStorage.unit = '°C';
    } else {
      myObjStorage.main.temp = Math.round((myObjStorage.main.temp * (9 / 5)) + 32);
      myObjStorage.main.temp_max = Math.round((myObjStorage.main.temp_max * (9 / 5)) + 32);
      myObjStorage.main.temp_min = Math.round((myObjStorage.main.temp_min * (9 / 5)) + 32);
      myObjStorage.unit = '°F';
    }
    Store.storeInfo(myObjStorage);
    UI.printInfo();
  }

  static showE(e) {
    document.getElementById('cityName').innerText = `${e}`;
    const errorCon = document.getElementById('errorCon');
    errorCon.innerHTML = `
    <img src=https://media.giphy.com/media/wSSooF0fJM97W/giphy.gif alt="" class="img-error text-center">
    `;
  }
}

export default UI;
