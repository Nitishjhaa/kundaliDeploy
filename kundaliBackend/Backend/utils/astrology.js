// Given an angle (0–360°), return the zodiac sign and its index.
function zodiacFromDegrees(deg) {
  const zodiacSigns = [
    "Aries,मेष", "Taurus, वृष", "Gemini, मिथुन", "Cancer, कर्क", "Leo, सिंह", "Virgo, कन्या",
    "Libra, तुला", "Scorpio, वृश्चिक", "Sagittarius, धनु", "Capricorn, मकर", "Aquarius, कुंभ", "Pisces, मीन"
  ];
  const index = Math.floor(deg / 30);
  const ascendantNumber = index + 1;
  return { sign: zodiacSigns[index], index: index, ascendant: ascendantNumber };
}

// Determine whole-sign house placement for a planet relative to a given ascendant index.
function houseOfPlanet(siderealLongitude, ascIndex) {
  const zodiac = zodiacFromDegrees(siderealLongitude);
  const house = ((zodiac.index - ascIndex + 12) % 12) + 1;
  return { zodiac: zodiac.sign, house: house, degrees: siderealLongitude };
}

// Calculate the nakshatra and its pada (charan) for a given sidereal longitude.
function getNakshatra(sidereal) {
  const nakshatraSpan = 360 / 27; // ≈ 13.3333° per nakshatra
  const nakIndex = Math.floor(sidereal / nakshatraSpan);
  const remainder = sidereal - (nakIndex * nakshatraSpan);
  const rawPada = Math.floor(remainder / (nakshatraSpan / 4)) + 1;
  const nakshatraNames = [
    "Ashwini,अश्विनी", "Bharani,भरणी", "Krittika,कृतिका", "Rohini,रोहिणी",
    "Mrigashira,मृगशिरा", "Ardra,अर्द्रा", "Punarvasu,पुनर्वसु", "Pushya,पुष्य",
    "Ashlesha,आश्लेषा", "Magha,मघा", "Purva_Phalguni,पूर्वाफाल्गुनी", "Uttara_Phalguni,उत्तराफाल्गुनी",
    "Hasta,हस्त", "Chitra,चित्रा", "Swati,स्वाती", "Vishakha,विशाखा",
    "Anuradha,अनुराधा", "Jyeshtha,ज्येष्ठा", "Mula,मूल", "Purva_Ashadha,पूर्वाषाढ़ा",
    "Uttara_Ashadha,उत्तराषाढ़ा", "Shravana,श्रवण", "Dhanishta,धनिष्ठा", "Shatabhisha,शतभिषा",
    "Purva_Bhadrapada,पूर्वभाद्रपदा", "Uttara_Bhadrapada,उत्तराभाद्रपद", "Revati,रेवती"
  ];
  const nakName = nakshatraNames[nakIndex] || "Unknown";
  const nakPada = rawPada > 4 ? 4 : rawPada;
  return { nakIndex, nakName, nakPada };
}

function getRashiSwami(rashiName) {
  switch (rashiName) {
    case "Aries,मेष":
      return "Mars / मंगल";
    case "Taurus, वृष":
      return "Venus / शुक्र";
    case "Gemini, मिथुन":
      return "Mercury / बुध";
    case "Cancer, कर्क":
      return "Moon / चंद्र";
    case "Leo, सिंह":
      return "Sun / सूर्य";
    case "Virgo, कन्या":
      return "Mercury / बुध";
    case "Libra, तुला":
      return "Venus / शुक्र";
    case "Scorpio, वृश्चिक":
      return "Mars / मंगल";
    case "Sagittarius, धनु":
      return "Jupiter / गुरु";
    case "Capricorn, मकर":
      return "Saturn / शनि";
    case "Aquarius, कुंभ":
      return "Saturn / शनि";
    case "Pisces, मीन":
      return "Jupiter / गुरु";
    default:
      return "Invalid Rashi Name";
  }
}


module.exports = {
  zodiacFromDegrees,
  houseOfPlanet,
  getNakshatra,
  getRashiSwami
};
