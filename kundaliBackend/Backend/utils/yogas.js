const getDrishtiFromHouses = ({
    sunHouse, moonHouse, marsHouse, mercuryHouse, jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse }) => {
    const mod12 = (val) => ((val - 1) % 12) + 1;

    const getPlanetaryDrishti = (planetPositions) => {
        const drishtiData = {};

        for (const [planet, position] of Object.entries(planetPositions)) {
            if (!position || typeof position !== 'number') continue;

            const drishti = {
                purnDrishti: [],
                'ekPaadDrishti': [],
                'doPaadDrishti': [],
                'teenPaadDrishti': []
            };

            // Default Drishti
            drishti['ekPaadDrishti'].push(mod12(position + 2));
            drishti['ekPaadDrishti'].push(mod12(position + 9));

            drishti['doPaadDrishti'].push(mod12(position + 4));
            drishti['doPaadDrishti'].push(mod12(position + 8));

            drishti['teenPaadDrishti'].push(mod12(position + 3));
            drishti['teenPaadDrishti'].push(mod12(position + 7));

            drishti.purnDrishti.push(mod12(position + 6));

            if (planet === 'Mars') {
                drishti.purnDrishti.push(mod12(position + 3));
                drishti.purnDrishti.push(mod12(position + 7));
            }

            if (planet === 'Jupiter') {
                drishti.purnDrishti.push(mod12(position + 4));
                drishti.purnDrishti.push(mod12(position + 8));
            }

            if (planet === 'Saturn') {
                drishti.purnDrishti.push(mod12(position + 2));
                drishti.purnDrishti.push(mod12(position + 9));
            }

            for (let key in drishti) {
                drishti[key] = [...new Set(drishti[key])].sort((a, b) => a - b);
            }

            drishtiData[planet] = drishti;
        }
        return drishtiData;
    };

    const planetPositions = {
        Sun: sunHouse,
        Moon: moonHouse,
        Mars: marsHouse,
        Mercury: mercuryHouse,
        Jupiter: jupiterHouse,
        Venus: venusHouse,
        Saturn: saturnHouse,
        Rahu: rahuHouse,
        Ketu: ketuHouse
    };

    return getPlanetaryDrishti(planetPositions);
};

function analyzeAscendantAndPlanets({
    ascZodiacNumber,
    sunHouse,
    marsHouse,
    moonHouse,
    mercuryHouse,
    jupiterHouse,
    venusHouse,
    saturnHouse,
    rahuHouse,
    ketuHouse
}) {
    const rashis = [
        "Mesh", "Vrishabh", "Mithun", "Kark", "Singh", "Kanya",
        "Tula", "Vrischik", "Dhanu", "Makar", "Kumbh", "Meen"
    ];

    const rashiTattvas = {
        1: "Fire / अग्नि", 2: "Earth / पृथ्वी", 3: "Wind / वायु", 4: "Water / जल",
        5: "Fire / अग्नि", 6: "Earth / पृथ्वी", 7: "Wind / वायु", 8: "Water / जल",
        9: "Fire / अग्नि", 10: "Earth / पृथ्वी", 11: "Wind / वायु", 12: "Water / जल"
    };

    const planetTattvas = {
        sun: "Fire / अग्नि",
        mars: "Fire / अग्नि",
        moon: "Water / जल",
        venus: "Water / जल",
        mercury: "Earth / पृथ्वी",
        jupiter: "Sky / आकाश।",
        saturn: "Wind / वायु",
        rahu: "Wind / वायु",
        ketu: "Fire / अग्नि"
    };

    const ascIndex = ascZodiacNumber - 1;
    const ascRashi = rashis[ascIndex];
    const ascTattva = rashiTattvas[ascZodiacNumber];

    const planetHouses = {
        sun: sunHouse,
        mars: marsHouse,
        moon: moonHouse,
        mercury: mercuryHouse,
        jupiter: jupiterHouse,
        venus: venusHouse,
        saturn: saturnHouse,
        rahu: rahuHouse,
        ketu: ketuHouse
    };

    const planetsInAsc = Object.entries(planetHouses).filter(([_, houseNum]) => houseNum === 1);
    const tattvasOfPlanetsInAsc = planetsInAsc.map(([planet]) => ({
        planet,
        tattva: planetTattvas[planet]
    }));

    const planetTattvasByRashi = {};
    for (const [planet, house] of Object.entries(planetHouses)) {
        const rashiNumber = ((ascZodiacNumber + house - 2) % 12) + 1;
        planetTattvasByRashi[planet] = rashiTattvas[rashiNumber];
    }

    return {
        ascRashi,
        ascTattva,
        planetsInAscendant: tattvasOfPlanetsInAsc,
        planetTattvas: planetTattvasByRashi
    };
}

const isNightTime = (birthDate, birthTime) => {
    const fullDateString = `${birthDate}T${birthTime}`;

    const fullDate = new Date(fullDateString);

    const hour = fullDate.getHours();

    if (hour >= 20 || hour < 4) {
        return true;
    }
    return false;
}

const allOtherYogas = ({
    Lagnesh, Dwityesh, Trityesh, Chaturthesh, Panchamesh, Shashthesh, Saptamesh, Ashtamesh, Navamesh, Dashmesh, Ekadashesh, Dwadashesh, LagneshPosition, DwityeshPosition, TrityeshPosition, ChaturtheshPosition, PanchameshPosition, ShashtheshPosition, SaptameshPosition, AshtameshPosition, NavameshPosition, DashmeshPosition, EkadasheshPosition, DwadasheshPosition, sunHouse, moonHouse, marsHouse, mercuryHouse, jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse, sunRashi, marsRashi, moonRashi, mercuryRashi, jupiterRashi, venusRashi, saturnRashi, rahuRashi, ketuRashi, birthDate, birthTime, sunDristi, moonDristi, marsDristi, mercuryDristi, jupiterDristi, venusDristi, saturnDristi, rahuDristi, ketuDristi, ascZodiacNumber, hindiMonths, paksha
}) => {
    const allMessages = [];


    //1st yogas logic var
    const merc_satdiff = (mercuryHouse - saturnHouse + 12) % 12;
    const isSaturnDrishtiOn6or12 = saturnDristi.some(dristi => dristi === 6 || dristi === 12);
    const sun_moondiff = (sunHouse - moonHouse + 12) % 12;

    // 2nd Logic var
    const allowedHouses = [1, 2, 3, 7, 8, 10, 11];
    const sunFriendsAscNumber = [1, 8, 4, 9, 12];
    const moonJupiterHouses = [2, 4, 5, 9, 11];
    const lessTalkingmercury = [4, 8, 12]
    const planetHouses = [sunHouse, moonHouse, marsHouse, mercuryHouse, jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse];
    const allPlanetsInAllowedHouses = planetHouses.every(house => allowedHouses.includes(house));
    const planetsInAllowedHousesCount = planetHouses.filter(house => allowedHouses.includes(house)).length;

    // 4th Logic var
    const isMoonAndVenusInFirst = moonHouse === 1 && moonHouse === venusHouse;

    // 6th logic var
    const jobYogBhav = [3, 6, 11]
    const dwadasheshGoodHouses = [1, 2, 4, 5, 9, 10];
    const grahaHouses = [moonHouse, mercuryHouse, jupiterHouse, venusHouse];
    const hasJobYog = grahaHouses.some(house => jobYogBhav.includes(house));
    const isMarsYog = jobYogBhav.includes(marsHouse) && [1, 8].includes(marsRashi);
    const isSaturnYog = jobYogBhav.includes(saturnHouse) && [10, 11].includes(saturnRashi);


    // 1st logic
    if (merc_satdiff === 4 && (ShashtheshPosition === 6 || ShashtheshPosition === 8 || ShashtheshPosition === 12)) {
        allMessages.push({
            type: "low_hearing",
            message: "कम सुनाई देनें का योग।"
        });
    }

    if (venusHouse === 12 && mercuryHouse === 12) {
        allMessages.push({
            type: "low_hearing",
            message: "कम सुनाई देनें का योग।"
        });
    }

    if (isNightTime(birthDate, birthTime) && mercuryHouse === 6 && venusHouse === 10) {
        allMessages.push({
            type: "low_hearing",
            message: "कम सुनाई देनें का योग।"
        });
    }

    if ((ShashtheshPosition === 6 || ShashtheshPosition === 12) && !isSaturnDrishtiOn6or12) {
        allMessages.push({
            type: "low_hearing",
            message: "कम सुनाई देनें का योग।"
        });
    }

    // 2nd Logic
    if (allPlanetsInAllowedHouses && planetsInAllowedHousesCount <= 2) {
        allMessages.push({
            number: "1",
            type: "stocks_market",
            message: "Stock Market Success Yog."
        });
    }

    if (sunFriendsAscNumber.includes(ascZodiacNumber) && sunHouse === moonHouse) {
        allMessages.push({
            number: "2",
            type: "stocks_market",
            message: "Stock Market Success Yog.."
        });
    }

    if (moonHouse === jupiterHouse && moonJupiterHouses.includes(moonHouse)) {
        allMessages.push({
            number: "3",
            type: "stocks_market",
            message: "Stock Market Success Yog..."
        });
    }

    if (mercuryHouse === 5 && [2, 5, 7].includes(ascZodiacNumber) && moonHouse === marsHouse && moonHouse === 11) {
        allMessages.push({
            number: "4",
            type: "stocks_market",
            message: "Stock Market Success Yog..."
        });
    }

    if ([3, 6, 8, 11].includes(sun_moondiff) && EkadasheshPosition === 11) {
        allMessages.push({
            number: "5",
            type: "stocks_market",
            message: "Stock Market Success Yog..."
        });
    }

    if (AshtameshPosition === 2 && DwityeshPosition === 8) {
        allMessages.push({
            number: "6",
            type: "stocks_market",
            message: "Stock Market Success Yog..."
        });
    }

    if (ShashtheshPosition === 11 && ShashtheshPosition === EkadasheshPosition) {
        allMessages.push({
            number: "7",
            type: "stocks_market",
            message: "Stock Market Success Yog..."
        });
    }

    if (PanchameshPosition === 5 && EkadasheshPosition === 5 && (rahuHouse === 5 || ketuHouse === 5)) {
        allMessages.push({
            number: "8",
            type: "stocks_market",
            message: "Stock Market Success Yog..."
        });
    }

    if (Panchamesh === "Venus" && (PanchameshPosition === ShashtheshPosition) && ShashtheshPosition === 11) {
        allMessages.push({
            number: "9",
            type: "stocks_market",
            message: "Stock Market Success Yog..."
        });
    }

    if (moonHouse === 5 && venusHouse === 11) {
        allMessages.push({
            number: "10",
            type: "stocks_market",
            message: "Stock Market Success Yog..."
        });
    }

    // 3rd logic
    if (hindiMonths === "अमावस्या" && lessTalkingmercury.includes(mercuryHouse)) {
        allMessages.push({
            number: "11",
            type: "less talking yogas",
            message: "kam ya naa bolne ka yog, introvert"
        })
    }

    if (mercuryHouse === ShashtheshPosition) {
        allMessages.push({
            number: "12",
            type: "less talking yogas",
            message: "kam ya naa bolne ka yog, introvert"
        })
    }

    if (jupiterHouse === ShashtheshPosition && jupiterHouse === 1) {
        allMessages.push({
            number: "13",
            type: "less talking yogas",
            message: "kam ya naa bolne ka yog, introvert"
        })
    }


    if (marsHouse === saturnHouse && (moonHouse === rahuHouse || moonHouse === ketuHouse)) {
        allMessages.push({
            number: "14",
            type: "less talking yogas",
            message: "kam ya naa bolne ka yog, introvert"
        })
    }

    if ((paksha === "शुक्ल पक्ष") && (moonHouse === marsHouse && moonHouse === 1)) {
        allMessages.push({
            number: "15",
            type: "less talking yogas",
            message: "kam ya naa bolne ka yog, introvert"
        })
    }

    if (sunHouse === mercuryHouse && sunRashi === 5) {
        allMessages.push({
            number: "16",
            type: "less talking yogas",
            message: "kam ya naa bolne ka yog, introvert"
        })
    }

    if ((saturnHouse === 2 || rahuHouse === 2 || ketuHouse === 2) && (DwityeshPosition === saturnHouse || DwityeshPosition === rahuHouse || DwityeshPosition === ketuHouse)) {
        allMessages.push({
            number: "17",
            type: "less talking yogas",
            message: "kam ya naa bolne ka yog, introvert"
        })
    }

    // 4th logic
    if (LagneshPosition === 6 && AshtameshPosition === LagneshPosition) {
        allMessages.push({
            number: "18",
            type: "Eye Health Concern",
            message: "There may be an issue or defect in the eye."
        })
    }

    if (venusHouse === 6 || venusHouse === 8) {
        allMessages.push({
            number: "19",
            type: "Eye Health Concern",
            message: "There may be an issue or defect in the eye."
        });
    }

    if (saturnDristi.includes(venusHouse) && (venusHouse === 8 || venusHouse === 1)) {
        allMessages.push({
            number: "20",
            type: "Eye Health Concern",
            message: "There may be an issue or defect in the eye."
        });
    }

    if (moonHouse === venusHouse && [6, 7, 8, 12].includes(venusHouse)) {
        allMessages.push({
            number: "21",
            type: "Eye Health Concern",
            message: "There may be an issue or defect in the eye."
        });
    }

    if ((moonHouse === venusHouse) && (moonHouse === 12 || moonHouse === 7)) {
        allMessages.push({
            number: "22",
            type: "Eye Health Concern",
            message: "There may be an issue or defect in the eye."
        });
    }

    if ((moonHouse === marsHouse) && (moonHouse === 1) && (jupiterDristi.includes(moonHouse) || venusDristi.includes(moonHouse))) {
        allMessages.push({
            number: "23",
            type: "Eye Health Concern",
            message: "There may be an issue or defect in the eye."
        });
    }

    if ([5, 9].includes(sunHouse) && (saturnDristi.includes(sunHouse) || rahuDristi.includes(sunHouse) || ketuDristi.includes(sunHouse))) {
        allMessages.push({
            number: "24",
            type: "Eye Health Concern",
            message: "There may be an issue or defect in the eye."
        });
    }

    if (marsHouse === 12 || saturnHouse === 2) {
        allMessages.push({
            number: "25",
            type: "Eye Health Concern",
            message: "There may be an issue or defect in the eye."
        });
    }

    if ((DwityeshPosition === saturnHouse || DwityeshPosition === marsHouse) || (DwadasheshPosition === saturnHouse || DwadasheshPosition === marsHouse)) {
        allMessages.push({
            number: "26",
            type: "Eye Health Concern",
            message: "There may be an issue or defect in the eye."
        });
    }

    if ((venusHouse === 1 || venusHouse === 8) && (saturnDristi.includes(venusHouse) || marsDristi.includes(venusHouse))) {
        allMessages.push({
            number: "27",
            type: "Eye Health Concern",
            message: "There may be an issue or defect in the eye."
        });
    }

    if ((DwityeshPosition === moonHouse && isMoonAndVenusInFirst) ||
        (DwadasheshPosition === moonHouse && isMoonAndVenusInFirst)) {
        allMessages.push({
            number: "28",
            type: "Eye Health Concern",
            message: "There may be an issue or defect in the eye."
        });
    }

    if ((moonRashi === 5 && moonHouse === 7 && marsDristi.includes(moonHouse)) || (sunRashi === 4 && sunHouse === 7 && marsDristi.includes(sunHouse))) {
        allMessages.push({
            number: "29",
            type: "Eye Health Concern",
            message: "There may be an issue or defect in the eye."
        });
    }

    // 5th logic
    if (marsHouse === saturnHouse && marsHouse === 1) {
        allMessages.push({
            number: "30",
            type: "comfort/pleasure concern",
            message: "Always have health concern"
        })
    }

    if (ShashtheshPosition === 6 || DwadasheshPosition === 12) {
        allMessages.push({
            number: "31",
            type: "comfort/pleasure concern",
            message: "absence of comfort/pleasure"
        })
    }

    // 6th logic
    if (dwadasheshGoodHouses.includes(DwadasheshPosition) && hasJobYog) {
        allMessages.push({
            number: "32",
            type: "job",
            message: "job yoga in deewani mekhma"
        });
    }

    if (dwadasheshGoodHouses.includes(DwadasheshPosition) && (isMarsYog || isSaturnYog)) {
        allMessages.push({
            number: "33",
            type: "job",
            message: "job yog in police department"
        });
    }

    return allMessages;

}

module.exports = {
    getDrishtiFromHouses,
    analyzeAscendantAndPlanets,
    allOtherYogas
};
