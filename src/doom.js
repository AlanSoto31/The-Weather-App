import API from "./api";
import Store from "./storage"

class UI {
    static takeCity(e) {
        e.preventDefault();
        let city = document.getElementById("city");
        API.getTemp(city.value, "imperial");
    }

    static printInfo() {
        let myObjStorage = JSON.parse(localStorage.getItem('myObjStorage'));

        document.getElementById("cityName").textContent = `${myObjStorage.name}, ${myObjStorage.sys.country}`;
        document.getElementById("weatherImg").setAttribute("src", `http://openweathermap.org/img/wn/${myObjStorage.weather[0].icon}@4x.png`)
        document.getElementById("weatherDesc").textContent = `${myObjStorage.weather[0].main}`;
        document.getElementById("mainTemp").textContent = `${Math.round(myObjStorage.main.temp)} ${myObjStorage.unit}`;
        document.getElementById("minTemp").textContent = `${Math.round(myObjStorage.main.temp_min)} ${myObjStorage.unit}`;
        document.getElementById("maxTemp").textContent = `${Math.round(myObjStorage.main.temp_max)} ${myObjStorage.unit}`;
        document.getElementById("hum").textContent = `${Math.round(myObjStorage.main.humidity)} %`;
    }

    static toggleDeg() {
        let myObjStorage = JSON.parse(localStorage.getItem('myObjStorage')); 
        let toggleBtn = document.getElementById("toggleDeg"); 
            if(myObjStorage.unit == "°F"){
                for (const property in myObjStorage.main) {
                    if(property != "humidity" && property != "pressure"){
                        myObjStorage.main[property] = Math.round((myObjStorage.main[property] -32) * (5/9));
                    }
                }
                myObjStorage.unit = "°C"
                //toggleBtn.innerText = "to °F"
            }else {
                for (const property in myObjStorage.main) {
                    if(property != "humidity" && property != "pressure"){
                        myObjStorage.main[property] = Math.round((myObjStorage.main[property] * (9/5))+32);
                    }
                }
                myObjStorage.unit = "°F"
                //toggleBtn.innerText = "to °C"
            }
        Store.storeInfo(myObjStorage);
        UI.printInfo();
    }
}

export default UI;

