const nakshatraHindiNames = {
  Ashwini: "अश्विनी",
  Bharani: "भरणी",
  Krittika: "कृतिका",
  Rohini: "रोहिणी",
  Mrigashira: "मृगशिरा",
  Ardra: "अर्द्रा",
  Punarvasu: "पुनर्वसु",
  Pushya: "पुष्य",
  Ashlesha: "आश्लेषा",
  Magha: "मघा",
  Purva_Phalguni: "पूर्वाफाल्गुनी",
  Uttara_Phalguni: "उत्तराफाल्गुनी",
  Hasta: "हस्त",
  Chitra: "चित्रा",
  Swati: "स्वाती",
  Vishakha: "विशाखा",
  Anuradha: "अनुराधा",
  Jyeshtha: "ज्येष्ठा",
  Mula: "मूल",
  Purva_Ashadha: "पूर्वाषाढ़ा",
  Uttara_Ashadha: "उत्तराषाढ़ा",
  Shravana: "श्रवण",
  Dhanishta: "धनिष्ठा",
  Shatabhisha: "शतभिषा",
  Purva_Bhadrapada: "पूर्वभाद्रपदा",
  Uttara_Bhadrapada: "उत्तराभाद्रपद",
  Revati: "रेवती",
};

const nakshatraNonCompatibleMap = {
  Ashwini: [],
  Bharani: ["Rohini", "Pushya", "Ashlesha", "Ardra", "Jyeshtha"],
  Krittika: ["Mrigashira", "Ardra", "Mula", "Purva_Phalguni"],
  Rohini: ["Ardra", "Mula", "Purva_Phalguni", "Pushya", "Magha", "Swati"],
  Mrigashira: ["Purva_Phalguni", "Punarvasu", "Pushya", "Uttara_Phalguni"],
  Ardra: ["Pushya", "Uttara_Phalguni", "Shravana", "Magha"],
  Punarvasu: ["Pushya", "Ashlesha", "Krittika", "Shatabhisha"],
  Pushya: ["Shravana", "Shatabhisha", "Chitra", "Magha", "Uttara_Phalguni"],
  Ashlesha: ["Purva_Phalguni", "Hasta", "Shatabhisha", "Purva_Bhadrapada"],
  Magha: ["Uttara_Phalguni", "Chitra", "Vishakha", "Uttara_Bhadrapada", "Rohini"],
  Purva_Phalguni: ["Ashlesha", "Hasta", "Swati", "Mrigashira"],
  Uttara_Phalguni: ["Chitra", "Vishakha", "Purva_Bhadrapada", "Punarvasu"],
  Hasta: ["Ashwini", "Mula", "Magha", "Anuradha", "Swati", "Bharani"],
  Chitra: ["Jyeshtha", "Purva_Ashadha", "Krittika", "Vishakha"],
  Swati: ["Anuradha", "Mula", "Uttara_Ashadha", "Rohini", "Mrigashira"],
  Vishakha: ["Rohini", "Magha", "Purva_Ashadha", "Shravana"],
  Anuradha: ["Mula", "Uttara_Ashadha", "Ardra", "Punarvasu"],
  Jyeshtha: ["Purva_Ashadha", "Shravana", "Ardra", "Uttara_Phalguni", "Shatabhisha", "Punarvasu"],
  Mula: [],
  Purva_Ashadha: ["Shravana", "Shatabhisha", "Uttara_Bhadrapada", "Pushya", "Ashlesha", "Chitra"],
  Uttara_Ashadha: ["Dhanishta", "Shatabhisha", "Purva_Bhadrapada", "Revati", "Magha", "Swati"],
  Shravana: ["Shatabhisha", "Uttara_Bhadrapada", "Ashwini", "Magha", "Purva_Phalguni"],
  Dhanishta: ["Purva_Bhadrapada", "Revati", "Anuradha", "Bharani"],
  Shatabhisha: ["Uttara_Bhadrapada", "Ashwini", "Krittika", "Dhanishta"],
  Purva_Bhadrapada: ["Revati", "Bharani", "Mula"],
  Uttara_Bhadrapada: ["Ashwini", "Krittika", "Mrigashira", "Purva_Ashadha"],
  Revati: ["Bharani", "Rohini", "Shravana", "Purva_Ashadha"]
};


function getNonCompatibleNakshatrasInHindi(nakshatraEnglish) {
  const incompatibleList = nakshatraNonCompatibleMap[nakshatraEnglish] || [];
  return incompatibleList.map(name => nakshatraHindiNames[name] || name);
}

function isMutuallyNonCompatible(boyNakshatra, girlNakshatra) {
  const girlInHindi = nakshatraHindiNames[girlNakshatra];
  const boyInHindi = nakshatraHindiNames[boyNakshatra];

  const girlNonCompatible = getNonCompatibleNakshatrasInHindi(girlNakshatra);
  const boyNonCompatible = getNonCompatibleNakshatrasInHindi(boyNakshatra);

  const boyInGirlList = girlNonCompatible.includes(boyInHindi);
  const girlInBoyList = boyNonCompatible.includes(girlInHindi);

  return {
    boyInGirlList,
    girlInBoyList,
    isMutual: boyInGirlList && girlInBoyList,
    details: {
      boy: {
        name: boyNakshatra,
        inHindi: boyInHindi,
        girlHasBoyInIncompatibilityList: boyInGirlList,
      },
      girl: {
        name: girlNakshatra,
        inHindi: girlInHindi,
        boyHasGirlInIncompatibilityList: girlInBoyList,
      },
    },
  };
}

function hasSunSaturnRahuDosha(sunHouseNumber, saturnHouseNumber, rahuHouseNumber) {
  const doshaHouses = [1, 4, 7, 8, 12];
  const affected = [];

  const isSunAffected = doshaHouses.includes(sunHouseNumber);
  const isSaturnAffected = doshaHouses.includes(saturnHouseNumber);
  const isRahuAffected = doshaHouses.includes(rahuHouseNumber);

  if (isSunAffected) affected.push("सूर्य");
  if (isSaturnAffected) affected.push("शनि");
  if (isRahuAffected) affected.push("राहु");

  if (isSunAffected || isSaturnAffected || isRahuAffected) {
    return {
      result: true,
      affectedPlanets: affected
    };
  }

  return {
    result: false,
    affectedPlanets: []
  };
}

module.exports = {getNonCompatibleNakshatrasInHindi, isMutuallyNonCompatible,hasSunSaturnRahuDosha}
