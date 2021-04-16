import UI from "./doom";
import Store from "./storage";

class API {
    static async getTemp(cityName, degrees) {

        cityName = cityName.toLowerCase();
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
            res2.unit = "°F"
            Store.storeInfo(res2);
            UI.printInfo(); 
        } catch (error) {
            errorMessage.innerText = error;
        }
    }

}

export default API;