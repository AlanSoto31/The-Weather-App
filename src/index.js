import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap';

const getTemp = async (cityName) => {

    let url = new URL('http://api.openweathermap.org/data/2.5/weather?q=&appid=224b1af71ed4916e22748acda3c2d895');
    url.searchParams.set('q', cityName); 
    let new_url = url.toString();

    try {
        let res = await fetch(new_url);
        let res2 = await res.json();
        //console.log(result2.main.feels_like);
        printInfo(res2); 
    } catch (error) {
        console.log(error);
    }
}
/*
const toggleDeg = async () => {

}
*/
const printInfo = (obj) => {
    let body = document.getElementById("bodyTable");
    body.innerHTML = ``;
    body.innerHTML = `    
    <tr>
    <th>${obj.main.temp}</th>
    <td>${obj.main.feels_like}</td>
    <td>${obj.main.temp_min}</td>
    <td>${obj.main.temp_max}</td>
    <td>${obj.main.humidity}</td>
    </tr>
    `; 
}


const takeCity = async (e) => {
    e.preventDefault();
    let city = document.getElementById("city");
    //console.log(city.value);
    getTemp(city.value);
}

// EVENTS

document.getElementById("form").addEventListener("submit", takeCity);

//document.getElementById("changeDeg").addEventListener("click", toggleDeg);





