const Lagan = require('../models/Lagan')

async function findLagan(ascZodiacName) {
    try {
        const lagan = await Lagan.findOne({ nameOfLagan: ascZodiacName })
        if (!lagan) {
            throw new Error(`No lagan found with number ${Lagan}`);
        }
        return lagan;
    } catch (error) {
        console.error("Error finding Lagan by number:", error);
        throw error;
    }
}

module.exports = {
    findLagan
}