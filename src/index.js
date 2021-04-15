import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap';
import Store from "./storage";


const getTemp = async (cityName, degrees) => {

    let url = new URL('http://api.openweathermap.org/data/2.5/weather?q=&units=&appid=224b1af71ed4916e22748acda3c2d895');
    url.searchParams.set('q', cityName);
    url.searchParams.set('units', degrees); 
    let new_url = url.toString();

    try {
        let res = await fetch(new_url);
        let res2 = await res.json();
        Store.storeInfo(res2.main);
        printInfo();
    } catch (error) {
        console.log(error);
    }
}



const toggleDeg = () => {
    let myObjStorage = JSON.parse(localStorage.getItem('myObjStorage'));
    let degrees = document.getElementById("toggleDeg");    
        if(degrees.textContent == "Fahrenheit"){
            for (const property in myObjStorage) {
                if(property != "humidity" && property != "pressure"){
                    myObjStorage[property] = Math.round((myObjStorage[property] -32) * (5/9));
                    degrees.innerText = "Celcius"
                }
            }
        }else {
            for (const property in myObjStorage) {
                if(property != "humidity" && property != "pressure"){
                    myObjStorage[property] = Math.round((myObjStorage[property] * (9/5))+32);
                    degrees.innerText = "Fahrenheit"
                }
            }
        }
    Store.storeInfo(myObjStorage);
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

// EVENTS

document.getElementById("form").addEventListener("submit", takeCity);

document.getElementById("toggleDeg").addEventListener("click", toggleDeg);





