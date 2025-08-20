const mongoose = require('mongoose');

const nakshatraNames = [
    "Ashwini,अश्विनी", "Bharani,भरणी", "Krittika,कृतिका", "Rohini,रोहिणी",
    "Mrigashira,मृगशिरा", "Ardra,अर्द्रा", "Punarvasu,पुनर्वसु", "Pushya,पुष्य",
    "Ashlesha,आश्लेषा", "Magha,मघा", "Purva_Phalguni,पूर्वाफाल्गुनी", "Uttara_Phalguni,उत्तराफाल्गुनी",
    "Hasta,हस्त", "Chitra,चित्रा", "Swati,स्वाती", "Vishakha,विशाखा",
    "Anuradha,अनुराधा", "Jyeshtha,ज्येष्ठा", "Mula,मूल", "Purva_Ashadha,पूर्वाषाढ़ा",
    "Uttara_Ashadha,उत्तराषाढ़ा", "Shravana,श्रवण", "Dhanishta,धनिष्ठा", "Shatabhisha,शतभिषा",
    "Purva_Bhadrapada,पूर्वभाद्रपदा", "Uttara_Bhadrapada,उत्तराभाद्रपद", "Revati,रेवती"
];

// Creating a schema for Nakshatras with four Padas
const nakshatraSchema = new mongoose.Schema({
    1: { 
        type: String
    }, // First Pada
    2: { 
        type: String
    }, // Second Pada
    3: { 
        type: String
    }, // Third Pada
    4: { 
        type: String
    }  // Fourth Pada
}, { _id: false });

// Creating an object that holds all Nakshatras dynamically
const nakshatraFields = {};
nakshatraNames.forEach(nakshatra => {
    nakshatraFields[nakshatra] = { type: nakshatraSchema };
});

// Creating a schema for planets, where each planet has all Nakshatras
const planetSchema = new mongoose.Schema(nakshatraFields, { _id: false });

// Main schema that includes all planets

const planetsInNakshatraSchema = new mongoose.Schema({
    sun: { 
        type: planetSchema
     },
    moon: { 
        type: planetSchema
     },
    mars: { 
        type: planetSchema
     },
    mercury: { 
        type: planetSchema
     },
    jupiter: { 
        type: planetSchema
     },
    venus: { 
        type: planetSchema
     },
    saturn: { 
        type: planetSchema
     },
    rahu: { 
        type: planetSchema
     },
    ketu: { 
        type: planetSchema
     }
});

module.exports = mongoose.model('PlanetsInNakshatra', planetsInNakshatraSchema);
