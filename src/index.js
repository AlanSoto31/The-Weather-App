import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap';
import Store from "./storage";

const getTemp = async (cityName, degrees) => {

    let url = new URL('http://api.openweathermap.org/data/2.5/weather?q=&units=&appid=224b1af71ed4916e22748acda3c2d895');
    url.searchParams.set('q', cityName);
    url.searchParams.set('units', degrees); 
    let new_url = url.toString();

    let errorMessage = document.getElementById("errorMessage");
    errorMessage.innerHTML = "";

    try {
        let res = await fetch(new_url);
        if(res.status == "404") throw "City not found";
        let res2 = await res.json();
        res2.main.city = cityName;
        res2.main.unit = "fahrenheit"
        Store.storeInfo(res2.main);
        printInfo(); 
    } catch (error) {
        errorMessage.innerText = error
    }
}

const toggleDeg = () => {
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
    printInfo();
}

const printInfo = () => {
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


const takeCity = async (e) => {
    e.preventDefault();
    let city = document.getElementById("city");
    getTemp(city.value, "standard");
}

printInfo();

// EVENTS

document.getElementById("form").addEventListener("submit", takeCity);

document.getElementById("toggleDeg").addEventListener("click", toggleDeg);





