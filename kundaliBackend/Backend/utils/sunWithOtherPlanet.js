function sunWithOtherPlanets(sunHouse, moonHouse, marsHouse, mercuryHouse, jupiterHouse, venusHouse, saturnHouse, rahuHouse, ketuHouse) {
    const result = [];

    const sunMoonHouseActions = {
        1: () => { result.push({ house: 1, message: "Sun-Moon in 1st house" }); },
        2: () => { result.push({ house: 2, message: "Sun-Moon in 2nd house" }); },
        3: () => { result.push({ house: 3, message: "Sun-Moon in 2nd house" }); },
        4: () => { result.push({ house: 4, message: "Sun-Moon in 2nd house" }); },
        5: () => { result.push({ house: 5, message: "Sun-Moon in 2nd house" }); },
        6: () => { result.push({ house: 6, message: "Sun-Moon in 2nd house" }); },
        7: () => { result.push({ house: 7, message: "Sun-Moon in 2nd house" }); },
        8: () => { result.push({ house: 8, message: "Sun-Moon in 2nd house" }); },
        9: () => { result.push({ house: 9, message: "Sun-Moon in 2nd house" }); },
        10: () => { result.push({ house: 10, message: "Sun-Moon in 2nd house" }); },
        11: () => { result.push({ house: 11, message: "Sun-Moon in 2nd house" }); },
        12: () => { result.push({ house: 12, message: "Sun-Moon in 2nd house" }); },
    };

    const sunMarsHouseAction = {
        1: () => { result.push({ house: 1, message: "Sun-Moon in 1st house" });},
        2: () => { result.push({ house: 2, message: "Sun-Moon in 2nd house" });},
        3: () => { result.push({ house: 3, message: "Sun-Moon in 2nd house" });},
        4: () => { result.push({ house: 4, message: "Sun-Moon in 2nd house" });},
        5: () => { result.push({ house: 5, message: "Sun-Moon in 2nd house" });},
        6: () => { result.push({ house: 6, message: "Sun-Moon in 2nd house" });},
        7: () => { result.push({ house: 7, message: "Sun-Moon in 2nd house" });},
        8: () => { result.push({ house: 8, message: "Sun-Moon in 2nd house" });},
        9: () => { result.push({ house: 9, message: "Sun-Moon in 2nd house" });},
        10: () => { result.push({ house: 10, message: "Sun-Moon in 2nd house" });},
        11: () => { result.push({ house: 11, message: "Sun-Moon in 2nd house" });},
        12: () => { result.push({ house: 12, message: "Sun-Moon in 2nd house" });},
    };

    const sunMercuryHouseAction = {
        1: () => { result.push({ house: 1, message: "Sun-Moon in 1st house" });},
        2: () => { result.push({ house: 2, message: "Sun-Moon in 2nd house" });},
        3: () => { result.push({ house: 3, message: "Sun-Moon in 2nd house" });},
        4: () => { result.push({ house: 4, message: "Sun-Moon in 2nd house" });},
        5: () => { result.push({ house: 5, message: "Sun-Moon in 2nd house" });},
        6: () => { result.push({ house: 6, message: "Sun-Moon in 2nd house" });},
        7: () => { result.push({ house: 7, message: "Sun-Moon in 2nd house" });},
        8: () => { result.push({ house: 8, message: "Sun-Moon in 2nd house" });},
        9: () => { result.push({ house: 9, message: "Sun-Moon in 2nd house" });},
        10: () => { result.push({ house: 10, message: "Sun-Moon in 2nd house" });},
        11: () => { result.push({ house: 11, message: "Sun-Moon in 2nd house" });},
        12: () => { result.push({ house: 12, message: "Sun-Moon in 2nd house" });},
    };
    const sunJupiterHouseAction = {
        1: () => { result.push({ house: 1, message: "Sun-Moon in 1st house" });},
        2: () => { result.push({ house: 2, message: "Sun-Moon in 2nd house" });},
        3: () => { result.push({ house: 3, message: "Sun-Moon in 2nd house" });},
        4: () => { result.push({ house: 4, message: "Sun-Moon in 2nd house" });},
        5: () => { result.push({ house: 5, message: "Sun-Moon in 2nd house" });},
        6: () => { result.push({ house: 6, message: "Sun-Moon in 2nd house" });},
        7: () => { result.push({ house: 7, message: "Sun-Moon in 2nd house" });},
        8: () => { result.push({ house: 8, message: "Sun-Moon in 2nd house" });},
        9: () => { result.push({ house: 9, message: "Sun-Moon in 2nd house" });},
        10: () => { result.push({ house: 10, message: "Sun-Moon in 2nd house" });},
        11: () => { result.push({ house: 11, message: "Sun-Moon in 2nd house" });},
        12: () => { result.push({ house: 12, message: "Sun-Moon in 2nd house" });},
    };
    const sunVenusHouseAction = {
        1: () => { result.push({ house: 1, message: "Sun-Moon in 1st house" });},
        2: () => { result.push({ house: 2, message: "Sun-Moon in 2nd house" });},
        3: () => { result.push({ house: 3, message: "Sun-Moon in 2nd house" });},
        4: () => { result.push({ house: 4, message: "Sun-Moon in 2nd house" });},
        5: () => { result.push({ house: 5, message: "Sun-Moon in 2nd house" });},
        6: () => { result.push({ house: 6, message: "Sun-Moon in 2nd house" });},
        7: () => { result.push({ house: 7, message: "Sun-Moon in 2nd house" });},
        8: () => { result.push({ house: 8, message: "Sun-Moon in 2nd house" });},
        9: () => { result.push({ house: 9, message: "Sun-Moon in 2nd house" });},
        10: () => { result.push({ house: 10, message: "Sun-Moon in 2nd house" });},
        11: () => { result.push({ house: 11, message: "Sun-Moon in 2nd house" });},
        12: () => { result.push({ house: 12, message: "Sun-Moon in 2nd house" });},
    };
    const sunSaturnHouseAction = {
        1: () => { result.push({ house: 1, message: "Sun-Moon in 1st house" });},
        2: () => { result.push({ house: 2, message: "Sun-Moon in 2nd house" });},
        3: () => { result.push({ house: 3, message: "Sun-Moon in 2nd house" });},
        4: () => { result.push({ house: 4, message: "Sun-Moon in 2nd house" });},
        5: () => { result.push({ house: 5, message: "Sun-Moon in 2nd house" });},
        6: () => { result.push({ house: 6, message: "Sun-Moon in 2nd house" });},
        7: () => { result.push({ house: 7, message: "Sun-Moon in 2nd house" });},
        8: () => { result.push({ house: 8, message: "Sun-Moon in 2nd house" });},
        9: () => { result.push({ house: 9, message: "Sun-Moon in 2nd house" });},
        10: () => { result.push({ house: 10, message: "Sun-Moon in 2nd house" });},
        11: () => { result.push({ house: 11, message: "Sun-Moon in 2nd house" });},
        12: () => { result.push({ house: 12, message: "Sun-Moon in 2nd house" });},
    };
    const sunRahuHouseAction = {
        1: () => { result.push({ house: 1, message: "Sun-Moon in 1st house" });},
        2: () => { result.push({ house: 2, message: "Sun-Moon in 2nd house" });},
        3: () => { result.push({ house: 3, message: "Sun-Moon in 2nd house" });},
        4: () => { result.push({ house: 4, message: "Sun-Moon in 2nd house" });},
        5: () => { result.push({ house: 5, message: "Sun-Moon in 2nd house" });},
        6: () => { result.push({ house: 6, message: "Sun-Moon in 2nd house" });},
        7: () => { result.push({ house: 7, message: "Sun-Moon in 2nd house" });},
        8: () => { result.push({ house: 8, message: "Sun-Moon in 2nd house" });},
        9: () => { result.push({ house: 9, message: "Sun-Moon in 2nd house" });},
        10: () => { result.push({ house: 10, message: "Sun-Moon in 2nd house" });},
        11: () => { result.push({ house: 11, message: "Sun-Moon in 2nd house" });},
        12: () => { result.push({ house: 12, message: "Sun-Moon in 2nd house" });},
    };
    const sunKetuHouseAction = {
        1: () => { result.push({ house: 1, message: "Sun-Moon in 1st house" });},
        2: () => { result.push({ house: 2, message: "Sun-Moon in 2nd house" });},
        3: () => { result.push({ house: 3, message: "Sun-Moon in 2nd house" });},
        4: () => { result.push({ house: 4, message: "Sun-Moon in 2nd house" });},
        5: () => { result.push({ house: 5, message: "Sun-Moon in 2nd house" });},
        6: () => { result.push({ house: 6, message: "Sun-Moon in 2nd house" });},
        7: () => { result.push({ house: 7, message: "Sun-Moon in 2nd house" });},
        8: () => { result.push({ house: 8, message: "Sun-Moon in 2nd house" });},
        9: () => { result.push({ house: 9, message: "Sun-Moon in 2nd house" });},
        10: () => { result.push({ house: 10, message: "Sun-Moon in 2nd house" });},
        11: () => { result.push({ house: 11, message: "Sun-Moon in 2nd house" });},
        12: () => { result.push({ house: 12, message: "Sun-Moon in 2nd house" });},
    };

    // Check sunHouse === moonHouse and if we have an action for that house
    if (sunHouse === moonHouse && sunMoonHouseActions[sunHouse]) {
        sunMoonHouseActions[sunHouse]();
    }

    if(sunHouse === marsHouse && sunMarsHouseAction[sunHouse]) {
        sunMarsHouseAction[sunHouse]();
    }

    if(sunHouse === mercuryHouse && sunMercuryHouseAction[sunHouse]) {
        sunMercuryHouseAction[sunHouse]();
    }
    if(sunHouse === mercuryHouse && sunJupiterHouseAction[sunHouse]) {
        sunMercuryHouseAction[sunHouse]();
    }
    if(sunHouse === mercuryHouse && sunVenusHouseAction[sunHouse]) {
        sunMercuryHouseAction[sunHouse]();
    }
    if(sunHouse === mercuryHouse && sunSaturnHouseAction[sunHouse]) {
        sunMercuryHouseAction[sunHouse]();
    }
    if(sunHouse === mercuryHouse && sunRahuHouseAction[sunHouse]) {
        sunMercuryHouseAction[sunHouse]();
    }
    if(sunHouse === mercuryHouse && sunKetuHouseAction[sunHouse]) {
        sunMercuryHouseAction[sunHouse]();
    }

    return result;

    
}


module.exports = { sunWithOtherPlanets };