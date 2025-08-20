const nakshatras = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu",
    "Pushya", "Ashlesha", "Magha", "Purva_Phalguni", "Uttara_Phalguni", "Hasta",
    "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva_Ashadha",
    "Uttara_Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva_Bhadrapada",
    "Uttara_Bhadrapada", "Revati"
];


const taraTypes = [
  "जन्म",     // Janma
  "संपत्त",   // Sampat
  "विपत्त",   // Vipat
  "क्षेम",    // Kshema
  "प्रत्यारी", // Pratyari
  "साधक",     // Sadhaka
  "नैधन",     // Naidhana
  "मित्र",     // Mitra
  "अति-मित्र"  // Ati-Mitra
];


const auspicious = new Set([
  "संपत्त",
  "क्षेम",
  "साधक",
  "मित्र",
  "अति-मित्र"
]);

function getNakshatraIndex(name) {
    const index = nakshatras.findIndex(n => n.toLowerCase() === name.toLowerCase());
    if (index === -1) throw new Error(`Invalid Nakshatra name: ${name}`);
    return index;
}

function getTaraType(fromIndex, toIndex) {
    const diff = (toIndex - fromIndex + 27) % 9;
    return taraTypes[diff];
}

function calculateTaraPoints(girlNakshatra, boyNakshatra) {
    const gIndex = getNakshatraIndex(girlNakshatra);
    const bIndex = getNakshatraIndex(boyNakshatra);

    const taraGirlToBoy = getTaraType(gIndex, bIndex);
    const taraBoyToGirl = getTaraType(bIndex, gIndex);

    const isGirlToBoyAuspicious = auspicious.has(taraGirlToBoy);
    const isBoyToGirlAuspicious = auspicious.has(taraBoyToGirl);

    let points = 0;
    if(taraGirlToBoy === taraBoyToGirl) {
        points = 3;
    }
    if (isGirlToBoyAuspicious && isBoyToGirlAuspicious) {
        points = 3;
        
    } else if (isGirlToBoyAuspicious || isBoyToGirlAuspicious) {
        points = 1.5;
    }

    return {
        points,
        taraGirlToBoy,
        taraBoyToGirl
    };
}


module.exports = { calculateTaraPoints }