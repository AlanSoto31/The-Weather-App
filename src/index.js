import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap';


const getTemp = async (cityName) => {

    let url = new URL('http://api.openweathermap.org/data/2.5/weather?q=London&appid=224b1af71ed4916e22748acda3c2d895');
    url.searchParams.set('q', cityName); 
    let new_url = url.toString();

    try {
        let result = await fetch(new_url);
        let result2 = await result.json();
        console.log(result2.main.feels_like);
    } catch (error) {
        console.log(error);
    }
}

getTemp("London");

