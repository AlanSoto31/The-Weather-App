import API from "./api";
import Store from "./storage"

class UI {
    static takeCity(e) {
        e.preventDefault();
        let city = document.getElementById("city");
        API.getTemp(city.value, "standard");
    }

    static printInfo() {
        let myObjStorage = JSON.parse(localStorage.getItem('myObjStorage'));
        let body = document.getElementById("bodyTable");
        body.innerHTML = ``;
        body.innerHTML = `    
        <tr>
        <th>${Math.round(myObjStorage.temp)}</th>
        <td>${Math.round(myObjStorage.feels_like)}</td>
        <td>${Math.round(myObjStorage.temp_min)}</td>
        <td>${Math.round(myObjStorage.temp_max)}</td>
        <td>${Math.round(myObjStorage.humidity)}</td>
        </tr>
        `; 
    }

    static toggleDeg() {
        let myObjStorage = JSON.parse(localStorage.getItem('myObjStorage'));  
            if(myObjStorage.unit == "fahrenheit"){
                for (const property in myObjStorage) {
                    if(property != "humidity" && property != "pressure" && property != "city"){
                        myObjStorage[property] = Math.round((myObjStorage[property] -32) * (5/9));
                    }
                }
                //degrees.innerText = "Celcius"
                myObjStorage.unit = "celcius"
            }else {
                for (const property in myObjStorage) {
                    if(property != "humidity" && property != "pressure" && property != "city"){
                        myObjStorage[property] = Math.round((myObjStorage[property] * (9/5))+32);
                    }
                }
                myObjStorage.unit = "fahrenheit"
                //degrees.innerText = "Fahrenheit"
            }
        Store.storeInfo(myObjStorage);
        UI.printInfo();
    }
}

export default UI;