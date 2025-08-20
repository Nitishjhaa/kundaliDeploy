const signToNumberMap = {
  "Aries,मेष": 1,
  "Taurus, वृष": 2,
  "Gemini, मिथुन": 3,
  "Cancer, कर्क": 4,
  "Leo, सिंह": 5,
  "Virgo, कन्या": 6,
  "Libra, तुला": 7,
  "Scorpio, वृश्चिक": 8,
  "Sagittarius, धनु": 9,
  "Capricorn, मकर": 10,
  "Aquarius, कुंभ": 11,
  "Pisces, मीन": 12,
};

/**
 * Returns both the Chandra Moon Zodiac number and offset from Ascendant
 * @param {string} ascendantStr - e.g., "Scorpio, वृश्चिक"
 * @param {number} moonHousePosition - e.g., 3 (Moon is in 3rd house from Ascendant in Lagna Kundli)
 * @returns {{ chandraMoonZodiac: number, offset: number }}
 */
function getChandraData(ascendantStr, moonHousePosition) {
  const ascNum = signToNumberMap[ascendantStr.trim()];
  if (!ascNum) throw new Error("Invalid Ascendant String");

  // Chandra Kundli: Moon becomes 1st house
  const chandraMoonZodiac = ((ascNum + (moonHousePosition - 1) - 1) % 12) + 1;

  // Offset from Ascendant to Moon in Lagna
  const offset = (chandraMoonZodiac - ascNum + 12) % 12;

  return {
    chandraMoonZodiac,
    offset
  };
}



module.exports = { getChandraData };
