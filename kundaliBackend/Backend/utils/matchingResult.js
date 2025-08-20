const matchingData = require('../match-matching/grah_data.json');

function findMatchingNakshatra(nakName, charanNumber) {
  // Normalize: handle both English and Hindi nakshatra names
  const normalizedNakName = nakName.trim();

  return matchingData.find(entry => {
    // Check if the nakshatara matches either part of `nakName` (e.g., "Revati,रेवती")
    const entryNak = entry.nakshatara.trim();
    const allNames = normalizedNakName.split(',').map(name => name.trim());

    // Match nakshatra name
    const isNakshatraMatch = allNames.includes(entryNak);

    // Match charan
    let isCharanMatch = false;
    if (entry.charan.includes('-')) {
      const [start, end] = entry.charan.split('-').map(Number);
      const validCharans = [];
      for (let i = start; i <= end; i++) {
        validCharans.push(i);
      }
      isCharanMatch = validCharans.includes(Number(charanNumber));
    }

    return isNakshatraMatch && isCharanMatch;
  });
}

module.exports = { findMatchingNakshatra }
