
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
   * Returns both the Sun Zodiac number and offset from Ascendant
   * @param {string} ascendantStr - e.g., "Leo, सिंह"
   * @param {number} sunHousePosition - e.g., 1 (Sun is in the 1st house from Ascendant in Sun Kundli)
   * @returns {{ sunZodiac: number, offset: number }}
   */
  function getSunData(ascendantStr, sunHousePosition) {
    const ascNum = signToNumberMap[ascendantStr.trim()];
    if (!ascNum) throw new Error("Invalid Ascendant String");
  
    // Sun Kundli: Sun becomes 1st house
    const sunZodiac = ((ascNum + (sunHousePosition - 1) - 1) % 12) + 1;
  
    // Offset from Ascendant to Sun in Lagna
    const offset = (sunZodiac - ascNum + 12) % 12;
  
    return {
      sunZodiac,
      offset
    };
  }
  
  module.exports = { getSunData };
  