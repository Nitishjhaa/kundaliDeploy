function calculatePlanetHouses(ascZodiacNumber, planetBhaavs) {
  const planetActualRashi = {};

  for (const [planet, bhaav] of Object.entries(planetBhaavs)) {
    const house = ((ascZodiacNumber + bhaav - 2) % 12) + 1;
    planetActualRashi[planet] = house;
  }

  return planetActualRashi;
}

module.exports = {calculatePlanetHouses}