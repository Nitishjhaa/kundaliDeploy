const { getRemedy } = require("./findRemidies");
const { findKaalSarpDataByName } = require('../controller/findKaalsarpYog')
const {kaalSarpYog} = require('./Dosh')

// Mapping Hindi planet names to English planet names
const hindiToEnglishPlanetMapping = {
  "मंगल": "Mars",
  "बुध": "Mercury",
  "शनि": "Saturn",
  "सूर्य": "Sun",
  "चंद्र": "Moon",
  "गुरु": "Jupiter",
  "शुक्र": "Venus",
  "राहु": "Rahu",
  "केतु": "Ketu",
};

// Function to get remedies for all inauspicious planets (ashubhGrah)
const getAshubhPlanetRemedies = async ({
  ashubhGrah,
  maarakGrah,
  sunHouse,
  marsHouse,
  moonHouse,
  saturnHouse,
  mercuryHouse,
  jupiterHouse,
  venusHouse,
  ketuHouse,
  rahuHouse,
}) => {
  // Mapping of planets to their respective house variables
  const planetHouseMapping = {
    Sun: sunHouse,
    Mars: marsHouse,
    Moon: moonHouse,
    Mercury: mercuryHouse,
    Jupiter: jupiterHouse,
    Venus: venusHouse,
    Saturn: saturnHouse,
    Rahu: rahuHouse,
    Ketu: ketuHouse,
  };

  // Split the inauspicious planets string into an array of planet names
  const planets = ashubhGrah.split(",").map(planet => planet.trim());
  const maarakplanets = maarakGrah.split(",").map(planet => planet.trim());

  // Convert Hindi planet names to English
  const englishPlanets = planets.map(hindiPlanet => hindiToEnglishPlanetMapping[hindiPlanet]);
  const englishMaarakPlanets = maarakplanets.map(hindiPlanet => hindiToEnglishPlanetMapping[hindiPlanet]);

  // Remove duplicates: if a planet is present in both maarakGrah and ashubhGrah, it should only appear once
  const uniquePlanets = [...new Set([...englishPlanets, ...englishMaarakPlanets])];

  // Fetch remedies for all inauspicious planets
  const remedies = [];
  const maarakRemedies = [];

  // Loop through the unique planets and get remedies
  for (const planet of uniquePlanets) {
    const house = planetHouseMapping[planet];
    if (house) {
      const remedy = await getRemedy(planet, house);

      // If the planet is in the ashubhGrah list, add to remedies
      if (englishPlanets.includes(planet)) {
        remedies.push({ planet, remedy });
      }

      // If the planet is in the maarakGrah list and not already added to remedies, add to maarakRemedies
      if (englishMaarakPlanets.includes(planet) && !remedies.some(r => r.planet === planet)) {
        maarakRemedies.push({ planet, remedy });
      }
    }
  }

  // Return both remedies at the end of the function
  return { remedies, maarakRemedies };
};

const kaalSarpYogaRemidies = async (
  sunHouse, moonHouse, marsHouse, mercuryHouse,
  jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse
) => {
  try {
    const kaalSurpName = kaalSarpYog(
      sunHouse, moonHouse, marsHouse, mercuryHouse,
      jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse
    );

    if (!kaalSurpName) {
      // No kaal sarp yoga detected
      return null;
    }

    const infoOfKaalSurpYog = await findKaalSarpDataByName(kaalSurpName);

    // If no matching data found
    if (!infoOfKaalSurpYog || !infoOfKaalSurpYog.remedies) {
      return null;
    }

    return infoOfKaalSurpYog.remedies;

  } catch (err) {
    console.error("Error fetching Kaal Sarp remedies:", err);
    return null; // or throw if you want it handled upstream
  }
};


module.exports = { getAshubhPlanetRemedies,kaalSarpYogaRemidies };
