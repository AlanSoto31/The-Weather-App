import UI from './doom';
import Store from './storage';

class API {
  static async getTemp(cityName, degrees) {
    cityName = cityName.toLowerCase();
    const url = new URL('https://api.openweathermap.org/data/2.5/weather?q=&units=&appid=224b1af71ed4916e22748acda3c2d895');
    url.searchParams.set('q', cityName);
    url.searchParams.set('units', degrees);
    const newUrl = url.toString();

    try {
      const res = await fetch(newUrl);
      if (res.status === 404) throw Error('City not found');
      const res2 = await res.json();
      res2.unit = '°F';
      Store.storeInfo(res2);
      UI.printInfo();
    } catch (e) {
      UI.showE(e);
    }
  }
}

export default API;