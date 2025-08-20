// Convert radians to degrees
function degrees(radians) {
    return radians * 180 / Math.PI;
  }
  
  // Normalize an angle (in degrees) to the range 0–360
  function normalizeDeg(x) {
    return ((x % 360) + 360) % 360;
  }
  
  // Get the "ansh" – the remainder (0 to 30) when the angle is reduced modulo 30
  function getAnsh(deg) {
    return deg - Math.floor(deg / 30) * 30;
  }
  
  // Convert heliocentric spherical coordinates to rectangular coordinates
  function heliocentricToRectangular(pos) {
    const { lon, lat, range } = pos;
    return {
      x: range * Math.cos(lat) * Math.cos(lon),
      y: range * Math.cos(lat) * Math.sin(lon),
      z: range * Math.sin(lat)
    };
  }
  
  // Compute geocentric ecliptic longitude (in degrees) for a planet using VSOP87 data
  function geocentricLongitude(planet, earth, JD) {
    const posPlanet = planet.position2000(JD);
    const posEarth = earth.position2000(JD);
    const rectPlanet = heliocentricToRectangular(posPlanet);
    const rectEarth = heliocentricToRectangular(posEarth);
    const rectGeo = {
      x: rectPlanet.x - rectEarth.x,
      y: rectPlanet.y - rectEarth.y,
      z: rectPlanet.z - rectEarth.z
    };
    let lonGeo = Math.atan2(rectGeo.y, rectGeo.x); // in radians
    return normalizeDeg(degrees(lonGeo));
  }
  
  module.exports = {
    degrees,
    normalizeDeg,
    getAnsh,
    heliocentricToRectangular,
    geocentricLongitude
  };
  