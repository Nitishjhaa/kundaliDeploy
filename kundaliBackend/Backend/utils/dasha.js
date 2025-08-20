
// const nakshatraLords = [
//   'Ketu', 'Venus', 'Sun', 'Moon', 'Mars',     // 0–4
//   'Rahu', 'Jupiter', 'Saturn', 'Mercury',     // 5–8
//   'Ketu', 'Venus', 'Sun', 'Moon', 'Mars',     // 9–13
//   'Rahu', 'Jupiter', 'Saturn', 'Mercury',     // 14–17
//   'Ketu', 'Venus', 'Sun', 'Moon', 'Mars',     // 18–22
//   'Rahu', 'Jupiter', 'Saturn', 'Mercury'      // 23–26
// ];

// const dashaDurations = {
//   Ketu: 7,
//   Venus: 20,
//   Sun: 6,
//   Moon: 10,
//   Mars: 7,
//   Rahu: 18,
//   Jupiter: 16,
//   Saturn: 19,
//   Mercury: 17
// };

// const fullDashaOrder = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];

// function calculateMahadasha(birthDateTime, nakshatraIndex, nakshatraDegree) {
//   const totalNakDegrees = 13.333333333; // 13°20′

//   const startPlanet = nakshatraLords[nakshatraIndex];
//   const startPlanetDuration = dashaDurations[startPlanet];

//   // Calculate the remaining balance of the Dasha (in years)
//   const balanceYears = (1 - (nakshatraDegree / totalNakDegrees)) * startPlanetDuration;

//   // Rotate dasha order to start from the startPlanet
//   const startIndex = fullDashaOrder.indexOf(startPlanet);
//   const rotatedDashaOrder = [
//     ...fullDashaOrder.slice(startIndex),
//     ...fullDashaOrder.slice(0, startIndex)
//   ];

//   let sequence = [];
//   let currentTime = birthDateTime;

//   // Add first (partial) Dasha
//   const firstEnd = currentTime.plus({ months: balanceYears * 12 });
//   sequence.push({
//     planet: startPlanet,
//     start: currentTime.toISO(),
//     end: firstEnd.toISO()
//   });
//   currentTime = firstEnd;

//   // Add remaining 8 Mahadashas
//   for (let i = 1; i < 9; i++) {
//     const planet = rotatedDashaOrder[i % 9];
//     const duration = dashaDurations[planet];
//     const nextEnd = currentTime.plus({ years: duration });
//     sequence.push({
//       planet,
//       start: currentTime.toISO(),
//       end: nextEnd.toISO()
//     });
//     currentTime = nextEnd;
//   }

//   return sequence;
// }

// module.exports = calculateMahadasha;


const { DateTime } = require('luxon');

// Vimshottari Dasha Lords and Durations
const nakshatraLords = [
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars',
  'Rahu', 'Jupiter', 'Saturn', 'Mercury',
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars',
  'Rahu', 'Jupiter', 'Saturn', 'Mercury',
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars',
  'Rahu', 'Jupiter', 'Saturn', 'Mercury'
];

const dashaDurations = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17
};

const fullDashaOrder = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];

function rotateFrom(array, value) {
  const index = array.indexOf(value);
  return [...array.slice(index), ...array.slice(0, index)];
}

// Generic sub-dasha calculator with 2-month trim
function calculateSubDasha(parentPlanet, parentStart, parentEnd, level) {
  const adjustedParentEnd = parentEnd//.minus({ months: 2 }); // Trim here too
  const durationInMs = adjustedParentEnd.toMillis() - parentStart.toMillis();
  const subDashaList = [];
  const rotatedOrder = rotateFrom(fullDashaOrder, parentPlanet);
  const totalWeight = fullDashaOrder.reduce((sum, p) => sum + dashaDurations[p], 0);

  let currentStart = parentStart;

  for (let i = 0; i < rotatedOrder.length; i++) {
    const subPlanet = rotatedOrder[i];
    const weight = dashaDurations[subPlanet];
    const portion = weight / totalWeight;
    const durationMs = portion * durationInMs;

    const subEnd = (i === rotatedOrder.length - 1)
      ? adjustedParentEnd
      : currentStart.plus({ milliseconds: durationMs });

    const subDasha = {
      planet: subPlanet,
      start: currentStart.toISO(),
      end: subEnd.toISO()
    };

    // Nest if not deeper than Pratyantardasha
    if (level < 2) {
      subDasha[level === 0 ? 'antardasha' : 'pratyantardasha'] =
        calculateSubDasha(subPlanet, currentStart, subEnd, level + 1);
    }

    subDashaList.push(subDasha);
    currentStart = subEnd;
  }

  return subDashaList;
}

// Main Dasha Tree Generator
function calculateDashaTree(birthDateTime, nakshatraIndex, nakshatraDegree) {
  const totalNakDegrees = 13.333333333;
  const startPlanet = nakshatraLords[nakshatraIndex];
  const startPlanetDuration = dashaDurations[startPlanet];
  const balanceYears = (1 - (nakshatraDegree / totalNakDegrees)) * startPlanetDuration;

  const rotatedMahadasha = rotateFrom(fullDashaOrder, startPlanet);
  const mahadasha = [];

  let currentTime = birthDateTime;
  const firstEnd = currentTime.plus({ months: balanceYears * 12 })//.plus({ months: 2 });

  // First Mahadasha
  mahadasha.push({
    planet: rotatedMahadasha[0],
    start: currentTime.toISO(),
    end: firstEnd.toISO(),
    antardasha: calculateSubDasha(rotatedMahadasha[0], currentTime, firstEnd, 1)
  });

  currentTime = firstEnd;

  for (let i = 1; i < rotatedMahadasha.length; i++) {
    const planet = rotatedMahadasha[i];
    const duration = dashaDurations[planet];
    const nextEnd = currentTime.plus({ years: duration })//.minus({ months: 2 });

    mahadasha.push({
      planet,
      start: currentTime.toISO(),
      end: nextEnd.toISO(),
      antardasha: calculateSubDasha(planet, currentTime, nextEnd, 1)
    });

    currentTime = nextEnd;
  }

  return mahadasha;
}

module.exports = calculateDashaTree;
