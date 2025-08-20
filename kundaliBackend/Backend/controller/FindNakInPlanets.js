const PlanetsInNakshatra = require('../models/plantesInNakshatra'); // Adjust path

async function findInfoAboutSunInNakshatra(sunNak) {
    try {
        const { nakName, nakPada } = sunNak;
        planet = "sun"

        // Find the document containing Nakshatra data for all planets
        const nakshatraData = await PlanetsInNakshatra.findOne();

        if (!nakshatraData || !nakshatraData[planet]) {
            return { message: "Planet data not found" };
        }

        // Access the correct Nakshatra inside the planet's object
        const nakshatraInfo = nakshatraData[planet][nakName];

        if (!nakshatraInfo) {
            return { message: "Nakshatra data not found for this planet" };
        }

        // Retrieve the Pada (Charan) information
        const padaInfo = nakshatraInfo[nakPada.toString()];

        if (!padaInfo) {
            return { message: "Pada information not found" };
        }

        return {
            planet,
            nakshatra: nakName,
            pada: nakPada,
            description: padaInfo
        };
    } catch (error) {
        console.error("Error fetching Nakshatra data:", error);
        return { error: "Internal Server Error" };
    }
}

async function findInfoAboutMoonInNakshatra(moonNak) {
    try {
        const { nakName, nakPada } = moonNak;
        planet = "moon"

        // Find the document containing Nakshatra data for all planets
        const nakshatraData = await PlanetsInNakshatra.findOne();

        if (!nakshatraData || !nakshatraData[planet]) {
            return { message: "Planet data not found" };
        }

        // Access the correct Nakshatra inside the planet's object
        const nakshatraInfo = nakshatraData[planet][nakName];

        if (!nakshatraInfo) {
            return { message: "Nakshatra data not found for this planet" };
        }

        // Retrieve the Pada (Charan) information
        const padaInfo = nakshatraInfo[nakPada.toString()];

        if (!padaInfo) {
            return { message: "Pada information not found" };
        }

        return {
            planet,
            nakshatra: nakName,
            pada: nakPada,
            description: padaInfo
        };
    } catch (error) {
        console.error("Error fetching Nakshatra data:", error);
        return { error: "Internal Server Error" };
    }
}

async function findInfoAboutMercuryInNakshatra(mercuryNak) {
    try {
        const { nakName, nakPada } = mercuryNak;
        planet = "mercury"

        // Find the document containing Nakshatra data for all planets
        const nakshatraData = await PlanetsInNakshatra.findOne();

        if (!nakshatraData || !nakshatraData[planet]) {
            return { message: "Planet data not found" };
        }

        // Access the correct Nakshatra inside the planet's object
        const nakshatraInfo = nakshatraData[planet][nakName];

        if (!nakshatraInfo) {
            return { message: "Nakshatra data not found for this planet" };
        }

        // Retrieve the Pada (Charan) information
        const padaInfo = nakshatraInfo[nakPada.toString()];

        if (!padaInfo) {
            return { message: "Pada information not found" };
        }

        return {
            planet,
            nakshatra: nakName,
            pada: nakPada,
            description: padaInfo
        };
    } catch (error) {
        console.error("Error fetching Nakshatra data:", error);
        return { error: "Internal Server Error" };
    }
}

async function findInfoAboutVenusInNakshatra(venusNak) {
    try {
        const { nakName, nakPada } = venusNak;
        planet = "venus"

        // Find the document containing Nakshatra data for all planets
        const nakshatraData = await PlanetsInNakshatra.findOne();

        if (!nakshatraData || !nakshatraData[planet]) {
            return { message: "Planet data not found" };
        }

        // Access the correct Nakshatra inside the planet's object
        const nakshatraInfo = nakshatraData[planet][nakName];

        if (!nakshatraInfo) {
            return { message: "Nakshatra data not found for this planet" };
        }

        // Retrieve the Pada (Charan) information
        const padaInfo = nakshatraInfo[nakPada.toString()];

        if (!padaInfo) {
            return { message: "Pada information not found" };
        }

        return {
            planet,
            nakshatra: nakName,
            pada: nakPada,
            description: padaInfo
        };
    } catch (error) {
        console.error("Error fetching Nakshatra data:", error);
        return { error: "Internal Server Error" };
    }
}

async function findInfoAboutJupiterInNakshatra(jupiterNak) {
    try {
        const { nakName, nakPada } = jupiterNak;
        planet = "jupiter"

        // Find the document containing Nakshatra data for all planets
        const nakshatraData = await PlanetsInNakshatra.findOne();

        if (!nakshatraData || !nakshatraData[planet]) {
            return { message: "Planet data not found" };
        }

        // Access the correct Nakshatra inside the planet's object
        const nakshatraInfo = nakshatraData[planet][nakName];

        if (!nakshatraInfo) {
            return { message: "Nakshatra data not found for this planet" };
        }

        // Retrieve the Pada (Charan) information
        const padaInfo = nakshatraInfo[nakPada.toString()];

        if (!padaInfo) {
            return { message: "Pada information not found" };
        }

        return {
            planet,
            nakshatra: nakName,
            pada: nakPada,
            description: padaInfo
        };
    } catch (error) {
        console.error("Error fetching Nakshatra data:", error);
        return { error: "Internal Server Error" };
    }
}


async function findInfoAboutMarsInNakshatra(marsNak) {
    try {
        const { nakName, nakPada } = marsNak;
        planet = "mars"

        // Find the document containing Nakshatra data for all planets
        const nakshatraData = await PlanetsInNakshatra.findOne();

        if (!nakshatraData || !nakshatraData[planet]) {
            return { message: "Planet data not found" };
        }

        // Access the correct Nakshatra inside the planet's object
        const nakshatraInfo = nakshatraData[planet][nakName];

        if (!nakshatraInfo) {
            return { message: "Nakshatra data not found for this planet" };
        }

        // Retrieve the Pada (Charan) information
        const padaInfo = nakshatraInfo[nakPada.toString()];

        if (!padaInfo) {
            return { message: "Pada information not found" };
        }

        return {
            planet,
            nakshatra: nakName,
            pada: nakPada,
            description: padaInfo
        };
    } catch (error) {
        console.error("Error fetching Nakshatra data:", error);
        return { error: "Internal Server Error" };
    }
}


async function findInfoAboutSaturnInNakshatra(saturnNak) {
    try {
        const { nakName, nakPada } = saturnNak;
        planet = "saturn"

        // Find the document containing Nakshatra data for all planets
        const nakshatraData = await PlanetsInNakshatra.findOne();

        if (!nakshatraData || !nakshatraData[planet]) {
            return { message: "Planet data not found" };
        }

        // Access the correct Nakshatra inside the planet's object
        const nakshatraInfo = nakshatraData[planet][nakName];

        if (!nakshatraInfo) {
            return { message: "Nakshatra data not found for this planet" };
        }

        // Retrieve the Pada (Charan) information
        const padaInfo = nakshatraInfo[nakPada.toString()];

        if (!padaInfo) {
            return { message: "Pada information not found" };
        }

        return {
            planet,
            nakshatra: nakName,
            pada: nakPada,
            description: padaInfo
        };
    } catch (error) {
        console.error("Error fetching Nakshatra data:", error);
        return { error: "Internal Server Error" };
    }
}


async function findInfoAboutRahuInNakshatra(rahuNak) {
    try {
        const { nakName, nakPada } = rahuNak;
        planet = "rahu"

        // Find the document containing Nakshatra data for all planets
        const nakshatraData = await PlanetsInNakshatra.findOne();

        if (!nakshatraData || !nakshatraData[planet]) {
            return { message: "Planet data not found" };
        }

        // Access the correct Nakshatra inside the planet's object
        const nakshatraInfo = nakshatraData[planet][nakName];

        if (!nakshatraInfo) {
            return { message: "Nakshatra data not found for this planet" };
        }

        // Retrieve the Pada (Charan) information
        const padaInfo = nakshatraInfo[nakPada.toString()];

        if (!padaInfo) {
            return { message: "Pada information not found" };
        }

        return {
            planet,
            nakshatra: nakName,
            pada: nakPada,
            description: padaInfo
        };
    } catch (error) {
        console.error("Error fetching Nakshatra data:", error);
        return { error: "Internal Server Error" };
    }
}


async function findInfoAboutKetuInNakshatra(ketuNak) {
    try {
        const { nakName, nakPada } = ketuNak;
        planet = "ketu"

        // Find the document containing Nakshatra data for all planets
        const nakshatraData = await PlanetsInNakshatra.findOne();

        if (!nakshatraData || !nakshatraData[planet]) {
            return { message: "Planet data not found" };
        }

        // Access the correct Nakshatra inside the planet's object
        const nakshatraInfo = nakshatraData[planet][nakName];

        if (!nakshatraInfo) {
            return { message: "Nakshatra data not found for this planet" };
        }

        // Retrieve the Pada (Charan) information
        const padaInfo = nakshatraInfo[nakPada.toString()];

        if (!padaInfo) {
            return { message: "Pada information not found" };
        }

        return {
            planet,
            nakshatra: nakName,
            pada: nakPada,
            description: padaInfo
        };
    } catch (error) {
        console.error("Error fetching Nakshatra data:", error);
        return { error: "Internal Server Error" };
    }
}


module.exports = {findInfoAboutSunInNakshatra,findInfoAboutMoonInNakshatra,findInfoAboutMercuryInNakshatra,findInfoAboutVenusInNakshatra,findInfoAboutMarsInNakshatra,findInfoAboutJupiterInNakshatra,findInfoAboutSaturnInNakshatra,findInfoAboutRahuInNakshatra,findInfoAboutKetuInNakshatra};
