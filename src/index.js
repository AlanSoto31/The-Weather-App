import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import UI from './doom';
import API from './api';

UI.printInfo();

// EVENTS

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const city = document.getElementById('city');
  API.getTemp(city.value, 'imperial');
});

document.getElementById('toggleDeg').addEventListener('click', UI.toggleDeg);

