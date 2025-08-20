function getNaamAksharInHindi(nakshatraInput) {
  const nakshatraMap = {
    Ashwini: ["चू", "चे", "चो", "ला"],
    Bharani: ["ली", "लू", "ले", "लो"],
    Krittika: ["अ", "ई", "उ", "ए"],
    Rohini: ["ओ", "वा", "वी", "वु"],
    Mrigashira: ["वे", "वो", "का", "की"],
    Ardra: ["कू", "घ", "ङ", "छ"],
    Punarvasu: ["के", "को", "हा", "ही"],
    Pushya: ["हू", "हे", "हो", "डा"],
    Ashlesha: ["डी", "डू", "डे", "डो"],
    Magha: ["मा", "मी", "मू", "मे"],
    Purva_Phalguni: ["मो", "टा", "टी", "टू"],
    Uttara_Phalguni: ["टे", "टो", "पा", "पी"],
    Hasta: ["पू", "ष", "ण", "ठ"],
    Chitra: ["पे", "पो", "रा", "री"],
    Swati: ["रू", "रे", "रो", "ता"],
    Vishakha: ["ती", "तू", "ते", "तो"],
    Anuradha: ["ना", "नी", "नू", "ने"],
    Jyeshtha: ["नो", "या", "यी", "यू"],
    Mula: ["ये", "यो", "भा", "भी"],
    Purva_Ashadha: ["भू", "धा", "फा", "ढा"],
    Uttara_Ashadha: ["भे", "भो", "जा", "जी"],
    Shravana: ["जू", "जे", "जो", "गु"],
    Dhanishta: ["गा", "गी", "गू", "गे"],
    Shatabhisha: ["गो", "सा", "सी", "सू"],
    Purva_Bhadrapada: ["से", "सो", "दा", "दी"],
    Uttara_Bhadrapada: ["दू", "थ", "झ", "ञ"],
    Revati: ["दे", "दो", "चा", "ची"]
  };

  const hindiToEnglish = {
    "अश्विनी": "Ashwini", "भरणी": "Bharani", "कृतिका": "Krittika", "रोहिणी": "Rohini",
    "मृगशिरा": "Mrigashira", "अर्द्रा": "Ardra", "पुनर्वसु": "Punarvasu", "पुष्य": "Pushya",
    "आश्लेषा": "Ashlesha", "मघा": "Magha", "पूर्वाफाल्गुनी": "Purva_Phalguni", "उत्तराफाल्गुनी": "Uttara_Phalguni",
    "हस्त": "Hasta", "चित्रा": "Chitra", "स्वाती": "Swati", "विशाखा": "Vishakha",
    "अनुराधा": "Anuradha", "ज्येष्ठा": "Jyeshtha", "मूल": "Mula", "पूर्वाषाढ़ा": "Purva_Ashadha",
    "उत्तराषाढ़ा": "Uttara_Ashadha", "श्रवण": "Shravana", "धनिष्ठा": "Dhanishta", "शतभिषा": "Shatabhisha",
    "पूर्वभाद्रपदा": "Purva_Bhadrapada", "उत्तराभाद्रपद": "Uttara_Bhadrapada", "रेवती": "Revati"
  };

  // Parse input like "Ashlesha,आश्लेषा"
  const parts = nakshatraInput.split(",").map(p => p.trim());
  let engName = null;

  for (let part of parts) {
    if (nakshatraMap[part]) {
      engName = part;
      break;
    }
    if (hindiToEnglish[part]) {
      engName = hindiToEnglish[part];
      break;
    }
  }

  if (!engName || !nakshatraMap[engName]) {
    return "अमान्य नक्षत्र (Invalid Nakshatra)";
  }


  return nakshatraMap[engName];
}


module.exports = {getNaamAksharInHindi}