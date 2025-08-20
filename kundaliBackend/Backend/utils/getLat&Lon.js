const cities = require('../node_modules/world-cities-json/data/cities.json');

function getLatLon(country, place) {

    function capitalizeFirstLetter(place) {
        return place.charAt(0).toUpperCase() + place.slice(1).toLowerCase();
    }

    const placeName = capitalizeFirstLetter(place)

    const cityData = cities.find(city => 
        city.country === country &&
        city.city === placeName
    );

    if (cityData) {
        return { lat: cityData.lat, lon: cityData.lng };
    } else {
        return { lat:28.61,lon: 77.23 };
    }
}

module.exports = {getLatLon}