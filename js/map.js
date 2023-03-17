import { toggleActivityForm } from './form.js';

const mapBlockElement = document.querySelector('#map-canvas');

const initMap = () => {

  const map = L.map(mapBlockElement)

    .on('load', () => {
      console.log('Карта инициализирована');
      toggleActivityForm(true);
    })

    .setView({
      lat: 59.92749,
      lng: 30.31127,
    }, 10);


  {L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);}

};

export { initMap };


