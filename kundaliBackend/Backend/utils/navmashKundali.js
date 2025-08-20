const signToNumberMap = {
  "Aries,मेष": 1, "Taurus, वृष": 2, "Gemini, मिथुन": 3, "Cancer, कर्क": 4,
  "Leo, सिंह": 5, "Virgo, कन्या": 6, "Libra, तुला": 7, "Scorpio, वृश्चिक": 8,
  "Sagittarius, धनु": 9, "Capricorn, मकर": 10, "Aquarius, कुंभ": 11, "Pisces, मीन": 12
};

const numberToSignMap = Object.entries(signToNumberMap).reduce((acc, [k, v]) => {
  acc[v] = k;
  return acc;
}, {});

function getSignType(signNum) {
  const movable = [1, 4, 7, 10];
  const fixed = [2, 5, 8, 11];
  const dual = [3, 6, 9, 12];
  if (movable.includes(signNum)) return "movable";
  if (fixed.includes(signNum)) return "fixed";
  if (dual.includes(signNum)) return "dual";
  return null;
}

function calculateNavamsaSign(signNum, siderealDegrees) {
  const degreesInSign = siderealDegrees % 30;
  const pada = Math.floor(degreesInSign / 3.3333) + 1;

  const signType = getSignType(signNum);
  let startPoint;

  if (signType === "movable") {
    startPoint = signNum;
  } else if (signType === "fixed") {
    startPoint = (signNum + 8 - 1) % 12 + 1;
  } else if (signType === "dual") {
    startPoint = (signNum + 4 - 1) % 12 + 1;
  } else {
    throw new Error("Invalid Sign Type");
  }

  const navamsaSign = ((startPoint + pada - 2 + 12) % 12) + 1;
  return navamsaSign;
}

function getNavamsaChart(planetsData, ascendantSign, ascendantDegrees) {
  const ascNum = signToNumberMap[ascendantSign.trim()];
  if (!ascNum) throw new Error("Invalid Ascendant Sign");

  const navAscendant = calculateNavamsaSign(ascNum, ascendantDegrees);

  const chart = {
    navamsaAscendant: navAscendant,
    navamsaAscendantSign: numberToSignMap[navAscendant],
    planets: {}
  };

  for (const planetName in planetsData) {
    const data = planetsData[planetName];
    const signNum = signToNumberMap[data.placement.zodiac.trim()];
    const degree = data.anshSidereal;

    const navSign = calculateNavamsaSign(signNum, degree);
    const house = ((navSign - navAscendant + 12) % 12) + 1;

    if (!chart.planets[house]) chart.planets[house] = [];
    chart.planets[house].push(planetName);
  }

  return chart;
}

module.exports = { getNavamsaChart };
