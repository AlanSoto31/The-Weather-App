import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap';
import UI from "./doom";

UI.printInfo();

// EVENTS

document.getElementById("form").addEventListener("submit", UI.takeCity);

document.getElementById("toggleDeg").addEventListener("click", UI.toggleDeg);





