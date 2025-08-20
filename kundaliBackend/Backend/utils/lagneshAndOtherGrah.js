function getHouseLordsWithPositions(ascendant, planetPositions) {
    const houseLordMap = {
        1: ["Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter"],
        2: ["Venus", "Mercury", "Moon", "Sun", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter", "Mars"],
        3: ["Mercury", "Moon", "Sun", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter", "Mars", "Venus"],
        4: ["Moon", "Sun", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter", "Mars", "Venus", "Mercury"],
        5: ["Sun", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter", "Mars", "Venus", "Mercury", "Moon"],
        6: ["Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter", "Mars", "Venus", "Mercury", "Moon", "Sun"],
        7: ["Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter", "Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury"],
        8: ["Mars", "Jupiter", "Saturn", "Saturn", "Jupiter", "Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury", "Venus"],
        9: ["Jupiter", "Saturn", "Saturn", "Jupiter", "Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury", "Venus", "Mars"],
        10: ["Saturn", "Saturn", "Jupiter", "Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury", "Venus", "Mars", "Jupiter"],
        11: ["Saturn", "Jupiter", "Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"],
        12: ["Jupiter", "Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Saturn",]
    };

    if (!houseLordMap[ascendant]) {
        return "Invalid Ascendant Number";
    }

    const houseLords = houseLordMap[ascendant];

    const houseNames = [
        "Lagnesh", "Dwityesh", "Trityesh", "Chaturthesh", "Panchamesh", "Shashthesh",
        "Saptamesh", "Ashtamesh", "Navamesh", "Dashmesh", "Ekadashesh", "Dwadashesh"
    ];

    const result = {};

    houseNames.forEach((name, i) => {
        const lord = houseLords[i];
        result[name] = lord;
        result[`${name}Position`] = planetPositions[lord] || null;
    });

    return result;
}
module.exports = {getHouseLordsWithPositions }
